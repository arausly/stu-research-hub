const router = require('express').Router();

router.get('/',(req,res,next)=>{
    res.render('home');
});

module.exports = router;