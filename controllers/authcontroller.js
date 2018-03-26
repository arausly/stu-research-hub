const User = require('../models/user');
const passport = require('passport');

// register user middleware
exports.registerUser = (req,res,next) => { 
     User.register({
         name:'name',
         email:'email'
     }),
     'password',function(err,user){
         if(err){
             req.flash('error','login Unsuccessful');
         }
         passports.authenticate('local',{
             successRedirect:'/home',
             failureRedirect:'/',
             failureFlash:'login Unsuccessful',
             successFlash:'Login Successful'
         });
     }
     next();
}