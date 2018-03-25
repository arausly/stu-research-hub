const express = require('express');
const morgan = require('morgan');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const home = require('./routes/home');

dotenv.config({path:'variables.env'});

//app initialization
const app = express();
const port = process.env.PORT;

//view engine setup
app.set('view engine','pug');
app.set('views',path.resolve(__dirname,'views'));

//middleware
app.use('/',express.static(path.resolve(__dirname,'public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//locals
app.use((req,res,next)=>{
  res.locals.title = '📖 sika';
  next();
});

// database setup
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_LOCAL);
mongoose.connection
   .once('open',()=>console.log('connected to the database'))
   .on('error',(err)=>console.log(err))
   .on('disconnected',()=>console.log('disconnected from database'));


//routes
app.use(home);

// listener setup
const server = app.listen(port,(err)=>{
     const { port:p, address:add } = server.address();
     err ? console.log(err) : console.log(`server is running on port ${p}`)
});
