const router = require('express').Router();
const passport = require('passport');
const {
    registerUser,
    getLandingPage,
    finalYearProj,
    getWelcomePage,
    login,
    renderPapers,
    logout,
    fileUpload,
    getPaper
} = require('../controllers/authcontroller');

const {
    upload,
    resize,
} = require('../controllers/file-upload');

router.get('/',getLandingPage);
router.get('/final-year-projects',finalYearProj);
router.get('/home',getWelcomePage);
router.get('/papers',renderPapers)
router.post('/login',login)
router.post('/sign-in',upload, resize, registerUser, login)
router.get('/logout',logout);
router.post('/home/file-upload',fileUpload);
router.get('/home/download/:_id',getPaper);
router.get('/final-year-projects', getPaper);
router.get('/research',getPaper);
router.get('/collaborate',getPaper);
module.exports = router;
