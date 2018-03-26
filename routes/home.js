const router = require('express').Router();

router.get('/',(req,res,next)=>{
    res.render('home',{detail:'login'});
});

router.get('/final-year-projects',(req,res,next)=>{
    res.render('upload',{detail:'Upload'})
})

router.get('/papers',(req,res,next)=>{
   res.render('paper');
});

module.exports = router;