const Helper = require('../utils/helper')
const Token = require('../models/Token')
const jwt = require("jsonwebtoken");

exports.refreshToken = (req,res) => {
    const refreshToken = req.body.token;

    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json({error:"You are not authenticated!"});
    Token.findOneAndDelete({_id:refreshToken}).then(result=>{
        if(!result) return res.status(403).json({error:"Refresh token is not valid!"});
        jwt.verify(refreshToken, "TODO:myRefreshSecretKey", (err, user) => {
            err && console.log(err);
            //Generate an access token
            const accessToken = Helper.generateAccessToken(user);
            const refreshToken = Helper.generateRefreshToken(user);
            const token = new Token({_id: refreshToken});
            token.save().then(result=>{
                res.status(200).json({result:{
                    accessToken,  
                    refreshToken,
                    }});
        })
        .catch(error=>res.status(500).json({error:error}));
        });
    })
    .catch(err=> {
        console.log(err)
        return res.status(500).json("Server error. Try again!");})
}