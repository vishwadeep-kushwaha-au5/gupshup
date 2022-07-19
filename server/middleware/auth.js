const jwt = require("jsonwebtoken");

//authentication middleware
exports.authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, "TODO:mySecretKey", (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
  
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  };

//authorrization middleware 
//TODO: this function needs to improved to accomodate all kinds of authorization, given that it's possible
exports.authorization = (req, res, next) =>{
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    next()
  } else {
    res.status(403).json({error: "Not Authorized!"});
  }
}