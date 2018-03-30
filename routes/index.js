const router = require('express').Router();
const passport = require('passport');
const {
    registerUser,
    getLandingPage,
    finalYearProj,
    getWelcomePage,
    login,
    getPapers,
    logout,
    fileUpload
} = require('../controllers/authcontroller');
const {
    upload,
    resize,
} = require('../controllers/file-upload');

router.get('/',getLandingPage);
router.get('/final-year-projects',finalYearProj);
router.get('/home',getWelcomePage);
// router.get('/papers',getPapers)
router.post('/login',login)
router.post('/sign-in',upload, resize, registerUser, login)
router.get('/logout',logout);
router.post('/home/file-upload',fileUpload,getPapers);
module.exports = router;
