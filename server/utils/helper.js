const jwt = require("jsonwebtoken");

exports.generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "TODO:mySecretKey", {
      expiresIn: "24h",
    });
  };
exports.generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "TODO:myRefreshSecretKey");
  };