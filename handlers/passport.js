const User = require('../models/user');
const passport = require('passport');

// store the user so i can reference
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

