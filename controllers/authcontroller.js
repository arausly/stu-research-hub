const User = require('../models/user');
const passport = require('passport');

// register user middleware
exports.registerUser = (req,res,next) => { 
  User.register(new User({
         name:req.body.username,
         email:req.body.email,
     }),
     req.body.password,function(err,user){
         if(err){
             res.redirect('/');
             req.flash('error','login Unsuccessful');
         }
         passport.authenticate('local')(req, res, function(){
             res.redirect('/home');
         });
     });
}

//login 
exports.loginUser = (req, res, next) => {
  passport.authenticate('local',{
      failureRedirect:'/',
      successRedirect:'/home',
      failureFlash:'login Unsuccessful',
      successFlash:'Login Successful'
  });
}

exports.logout = (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/')
}

// get landing page
exports.getLandingPage = (req, res) => {
    res.render('landingPage',{detail:'login'});
}

// get welcome page
exports.getWelcomePage = async (req, res) => {
   if(req.user){
      let email = req.user.email;
      let photo = User.createPhoto(email);
      let newuser = new User();
      newuser.avatar = photo;
      await newuser.save();
      res.render('homePage',{detail:'Upload',imgFile:photo});
   }else{
       res.redirect('/')
   }
}


// takes to final-year-page, if a guest can do nothing.
exports.finalYearProj = (req, res) => {
    const rights = (req.user) ? {msg:'Upload',stat:'open'} : {msg:'🔐Upload',stat:'locked'};
    res.render('upload',{detail:rights.msg,status:rights.stat});
}


exports.papers = (req, res) => {
    res.render('paper');
}
