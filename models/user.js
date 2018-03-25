const mongoose = require('mongoose');
const { Schema } = mongoose;
const slug = require('slugs');
const passportLocalMongoose = require('passport-local-mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const validator = require('validator');
const bcrypt = require('bcryptjs');


// must sign in with cu email.
const validateEmail = (email) => {
     let regex = /stu.cu.edu.ng/;
     return (validator.isEmail(email) && regex.test(email));
}

// schema definition
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
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
        validate:[validateEmail, 'Invalid email, please provide valid cu email'],
        unique:true
    },
    cluster:[String],
    category:[String],
    paper:[{
        type:Schema.Types.ObjectId
    }],
    slugs:String
});

// password hashing before saving to database
studentSchema.save('pre', async function(next){

    if(this.isModified('name')){
        this.slug = slug(this.name);
        const nameRegex = new RegexExp(`${this.name}(-([0-9])*$)?$`);
        const nameWithSlug = await this.constructor.find({slug:nameRegex});
        if(nameWithSlug.length){
            this.slug = `${this.slug}-${nameWithSlug.length++}`
        }
    }
    if(this.isModfied('password')){
         bcrypt.genSalt(10,function(err,salt){
            if (err) return next();
                bcrypt.hash(this.password,salt,function(err,hash){
                    if(err) return next();
                     this.password = hash;
                     await studentSchema.save();
                     return next();
                })
         })
    }
});

// handle validation errors and renders it cleanly
studentSchema.plugin(mongodbErrorHandler);

// helps with authentication
studentSchema.plugin(passportLocalMongoose);


//exports the model
module.exports = mongoose.models('student',studentSchema);
