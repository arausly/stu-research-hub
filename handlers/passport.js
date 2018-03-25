const studentSchema = require('../models/user');
const passport = require('passport');

passport.use(new LocalStrategy(studentSchema.authenticate()));

passport.serializeUser(studentSchema.serialzeUser());
passport.deserializeUser(studentSchema.deserializeUser());

