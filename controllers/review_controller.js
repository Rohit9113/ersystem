
const User = require('../models/users');
const Review = require('../models/review');



module.exports.createReview = async function(req, res){

    try{
        let recipient = await User.findById(req.params.id);

        if(!recipient){
            return res.redirect('/');
        }

        for(let i = 0; i < recipient.from.length; i++){
            if(req.user){
                if(recipient.from[i] == req.user.id){
                    const new_review = Review.create({
                        to : recipient.id,
                        from : req.user.id,
                        review : req.query.newReview,
                    });

                    if(!new_review){
                    }
                    
                    return res.redirect('/');
                }
            }else{
                return res.redirect("/user/sign-in");
            }
        }
        return res.redirect('/');
    }catch(err){
        console.log("Error", err);
        return;
    }

};