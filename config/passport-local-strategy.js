const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users')
// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true // This basically allows us to set the first argument as req at line 11
    },
    function(req, email, password, done){
        // find a user and establish the identity
        User.findOne({email: email},function(err,user){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            if(!user || user.password != password){
                req.flash('error','Invalid Username/Password');
                return done(null, false);
            }
            return done(null,user); // It will return the user to serializer
        });
    }
));

// serializing the user to decide which key is to kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});

// sending the data to ejs file

// check if the user  is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    // console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        // if user is sign in the isAuthenticated() return true
        // console.log('from isAuthenticated ->',req.user)
        // console.log(req.isAuthenticated());
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // console.log('from setAuthenticatedUser ->',req.user);
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user; 
        // console.log('after res.locals.user',res.locals.user);
        //The res.locals is an object that contains the local variables for the response which are scoped to the request only and therefore just available for the views rendered during that request or response cycle.
    }
    next();
}

module.exports = passport;