const router = require('express').Router();
const {
    registerUser,
    getLandingPage,
    finalYearProj,
    getWelcomePage,
    loginUser,
    papers
} = require('../controllers/authcontroller');


router.get('/',getLandingPage);
router.get('/final-year-projects',finalYearProj);
router.get('/home',getWelcomePage);
router.get('/papers',papers)
router.post('/sign-in',registerUser)
router.post('/login',loginUser);

module.exports = router;