
const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller')

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.get('/sign-out', userController.destroySession);
router.post('/create', userController.create);

// use passport as a middleware to authenticate
//authenticate() is middleware which will authenticate the request. By default, when authentication succeeds, the req. user property is set to the authenticated user, a session is established, and the next function in the stack is called.
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
), userController.createSession);


//authentication using google
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/sign-in'}), userController.createSession);


module.exports = router;