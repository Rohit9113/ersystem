const express = require('express');
const port = 1001;
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

//Authentication Using Passport js and session for cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');

// set flash message
const flash = require('connect-flash');
const customMWare = require('./config/middleware');

app.use(express.urlencoded());
app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true); 

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// add middleware which takes session-cookie and encrypt it
// Mongo Store is used to store the session cookie in the db
app.use(session({
    name: 'ERS',
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge : (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb+srv://rohitlohra3036:m8FP1u2VGNMS7FVT@cluster0.lwpqlde.mongodb.net/?retryWrites=true&w=majority',
            mongooseConnection: db,
            autoRemove: false
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(customMWare.setFlash);


// use express router
app.use('/',require('./routes'));



app.listen(port,function(err){
    if(err){
        console.log(`Error in connection the database ${err}`);
        return;
    }
    console.log(`Server is running at the port ${port}`);
})