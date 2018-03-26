const express = require('express');
const morgan = require('morgan');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const home = require('./routes/home');
const session = require('express-session')
const mongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const passport = require('passport');

dotenv.config({path:'variables.env'});

const {
  PORT,
  DATABASE_LOCAL,
  SECRET,
  DATABASE
} = process.env;
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
app.use(flash())
app.use(session({
  saveUninitialized:false,
  resave:false,
  key:'connect-sid',
  secret:SECRET,
  store: new mongoStore({url:DATABASE_LOCAL,autoReconnect:true})
}));
app.use(passport.initialize());
app.use(passport.session());

//locals
app.use((req,res,next)=>{
  res.locals.title = '📖 sika';
  res.locals.flashes = req.flash();
  next();
});

// database setup
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_LOCAL);
mongoose.connection
   .once('open',()=>console.log('connected to the database'))
   .on('error',(err)=>console.log(err))
   .on('disconnected',()=>console.log('disconnected from database'));


//routes
app.use(home);

// listener setup
const server = app.listen(PORT,(err)=>{
     const { port:p, address:add } = server.address();
     err ? console.log(err) : console.log(`server is running on port ${p}`)
});
