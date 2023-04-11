const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://rohitlohra3036:m8FP1u2VGNMS7FVT@cluster0.lwpqlde.mongodb.net/?retryWrites=true&w=majority");


const db= mongoose.connection;
db.on("error", console.error.bind(console,"Error in connection to Mongodb"));


db.once("open", function(){
    console.log("Successfully connected to Database :: MongoDB");

    
});

module.exports =db;

