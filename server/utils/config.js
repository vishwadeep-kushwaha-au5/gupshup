const cloudinary = require('cloudinary').v2;
require('dotenv').config()

// Configure your cloud name, API key and API secret:

//TODO: add api key and secret to env variables
const myconfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  secure: true
});

exports.myconfig = myconfig;