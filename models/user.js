const mongoose = require('mongoose');
const { Schema } = mongoose;
const slug = require('slug');
const passportLocalMongoose = require('passport-local-mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const validator = require('validator');
const bcrypt = require('bcryptjs');


// must sign in with cu email.
const validateEmail = (email) => {
     let regex = /stu.cu.edu.ng/;
     return regex.test(email);
}

// schema definition
const studentSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        validate:(email)=> validator.isEmail(email)
    },
    cluster:[String],
    category:[String],
    paper:[{
        type:String
    }]
});

// password hashing before saving to database
studentSchema.save('pre',function(next){
    if(this.isModfied('password')){
         bcrypt.genSalt(10,function(err,salt){
            if (err) return next();
                bcrypt.hash(this.password,salt,function(err,hash){
                    if(err) return next();
                     this.password = hash;
                     studentSchema.save();
                     return next();
                })
         })
    }
});

// handle validation errors and renders it cleanly
studentSchema.plugin(mongodbErrorHandler);

// helps with authentication
studentSchema.plugin(passportLocalMongoose)


//exports the model
module.exports = mongoose.models('student',studentSchema);
