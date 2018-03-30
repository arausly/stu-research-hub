const User = require('../models/user');
const passport = require('passport');
const Paper = require('../models/papers');
const multer = require('multer');
const jimp = require('jimp');


exports.registerUser = async(req, res, next) =>{
    try{
     const user = new User({email:req.body.email, username: req.body.username, department:req.body.departments, avatar:req.body.photo});
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




/* var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })*/

exports.fileUpload = async (req, res, next) => {
   try{
        console.log(req.body)
        if(!req.isAuthenticated && !req.files) return res.redirect('/final-year-projects');

        await new Paper({
        user:req.user._id,
        title:req.body.title,
       }).save();


        multerOptions = {
            storage:multer.memoryStorage(),
            fileFilter(req, file, next) {
                const isPdf = file.mimetype === ('application/pdf') || ('application/x-pdf');
                if(isPdf) {
                  next(null, true); 
                } else {
                   next({ message: 'This filetype is not allowed'}, false);
                }
            }
        }
   multer(multerOptions).single('newPaper');
   }catch(err){console.error(err)}
}

exports.writeToFile = async ()=>{
  if(!req.file) return next();
  const extension = req.file.mimetype.split('/')[1];
  req.body.newPaper = `${req.body.title}.${extension}`;

  const pdf = await jimp.read(req.file.buffer);
  await pdf.write(`./public/uploads/${req.body.pdf}`);
  next();
}


exports.getPapers = async (req, res, next) => {
     let journals = Paper.find({});
     res.render('paperPage',{journals})
}