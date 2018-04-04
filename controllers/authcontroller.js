const User = require('../models/user');
const passport = require('passport');
const Paper = require('../models/papers');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


exports.registerUser = async(req, res, next) => {
    try{
     const user = new User({email:req.body.email, fullname:req.body.fullname, username: req.body.username, department:req.body.departments, avatar:req.body.photo});
     await User.register(user, req.body.password);
     next(); 
    }catch(err){
        console.error(err);
    }
}

exports.login = passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: 'Failed Login!',
    successRedirect: '/home',
    successFlash: 'You are now logged in!'
  });

  
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
  try{
       if(req.user){
      let email = req.user.email;
      let photo = User.createPhoto(email);
      var imgFile;
      await User.findOne({email}).then((user)=>{
          if(!user) return Promise.reject();
          if(!user.avatar && user.avatar.length === 0) {
              user.avatar = photo;
              imgFile = photo
          }else{
             imgFile  = user.avatar;
          }
      }).catch(err=>console.error(err))

      res.render('homePage',{detail:'Upload',imgFile, name:req.user.username});
   }else{
       res.redirect('/')
   }
  }catch(err){
      console.error(err);
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

// test for pdf
const fileFilter = (req, file, next) => {
   const ispdf = file.mimetype.endsWith('pdf');
   if(ispdf){
       return next(null,true);
   }
   return next({message:'filetype is not allowed'},false);
}

// filename must be equal to title for this case
// client checking has been done
// server side check must also be done

const getFileName = () => fs.readdirSync(path.resolve(__dirname,'..','public','journals'))[0];



exports.fileUpload = async (req, res, next) => {
    // multer always uploads before passing to req
   try{
        if(!req.user && !req.file) return res.redirect('/final-year-projects');
   
    let storage = multer.diskStorage({
        destination:'./public/journals'
    }); 
   let upload = multer({storage,fileFilter}).any();
    upload(req, res, async (err)=>{
       if(err){
           console.log(err);
           return res.end('Error uploading file');
           res.redirect('/home');
       }else{
           // server-side check for filename-safety    
                await new Paper({
                    user:req.user._id,
                    title:req.body.title,
                    filename:getFileName(),
                }).save();
                res.redirect('/papers');
       }
    });
   }catch(err){next(err)}
}


//  render papers page.
exports.renderPapers = async (req, res, next) => {
     try{
    
          let journals = await Paper.find({}).populate('user');
          res.render('papers',{journals});

     }catch(err){
          console.error(err);
     }
}


// getPaper
exports.getPaper = async (req, res, next) => {
    let _id = req.params._id;
    console.log(_id);
    const paper = await Paper.findOne({_id});
    res.sendFile(path.resolve(__dirname,'..','public','journals',`${paper.filename}`));
}



