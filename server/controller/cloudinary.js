const cloudinary = require('cloudinary').v2;
require('../utils/config');
const apiSecret = cloudinary.config().api_secret;

exports.getCloudinarySignature = async (req, res)=>{
    const params = req.body

    try{
        const signature = cloudinary.utils.api_sign_request(params, apiSecret);
        return res.status(200).json({result: {timestamp:params.timestamp, signature}});
    }
    catch(error){
        return res.status(500).json({error: 'Error generatin cloudinary signature'})
    }
}