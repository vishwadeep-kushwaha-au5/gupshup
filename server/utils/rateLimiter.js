const rateLimit = require("express-rate-limit");

exports.registerLimiter = rateLimit({
  windowMs: 3 * 60 * 60 * 1000, // 3 hour window
  max: 100, // start blocking after 100 requests
  message:
    "Too many accounts Registered from this device, please try again in a few hours"
});

exports.loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 500, // start blocking after 500 requests
  message:
    "Too many Login attempts from this device, please try again in an hour"
});