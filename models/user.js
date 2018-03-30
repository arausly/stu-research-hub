const mongoose = require('mongoose');
const { Schema } = mongoose;
const slug = require('slugs');
const passportLocalMongoose = require('passport-local-mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const md5 = require('md5');

mongoose.Promise = global.Promise

// must sign in with cu email.
const validateEmail = (email) => {
     let regex = /stu.cu.edu.ng/;
     return (validator.isEmail(email) && regex.test(email));
}

// schema definition
const userSchema = new Schema({
    username:{
        type:String,
        trim:true, 
    },
    password:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        validate:[validateEmail, 'Invalid email, please provide valid cu email'],
        unique:true
    },
    cluster:[String],
    department:[{
        type:String,
    }],
    paper:[{
      type:Schema.Types.ObjectId
    }],
    slugs:String,
    avatar:String
});

// password hashing before saving to database

userSchema.pre('save', async function(next){
    if(this.isModified('name')){
        this.slug = slug(this.name);
        const nameRegex = new RegexExp(`${this.name}(-([0-9])*$)?$`);
        const nameWithSlug = await this.constructor.find({slug:nameRegex});
        if(nameWithSlug.length){
            this.slug = `${this.slug}-${nameWithSlug.length++}`
        }
    }
    next();
    // if(this.isModfied('password')){
    //      bcrypt.genSalt(10,function(err,salt){
    //         if (err) return next();
    //             bcrypt.hash(this.password,salt, async function(err,hash){
    //                 if(err) return next();
    //                  this.password = hash;
    //                  await userSchema.save();
    //                  return next();
    //             })
    //      })
    // }
});

// handle validation errors and renders it cleanly
userSchema.plugin(mongodbErrorHandler);

// helps with authentication
userSchema.plugin(passportLocalMongoose);


// generate default profile picture
userSchema.statics.createPhoto = (email) => {
  let hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}?s=200`;
}

//exports the model
module.exports = mongoose.model('users',userSchema);
