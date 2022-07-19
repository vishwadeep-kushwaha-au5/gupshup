const bcrypt = require("bcrypt");

const User = require('../models/User')
const Token = require('../models/Token')
const Helper = require('../utils/helper');
const { loginSchema, registerSchema, userSchema } = require('../utils/validation/userValidations');


exports.userSignup = async (req, res) => {
    let {email, name, password} = req.body;
    
    //basic validation
    const result = registerSchema.validate({email, name,password})
    if(result.error)
        return res.status(422).json({ error: result.error.details[0].message });

    let user = await User.findOne({email});
    if(user) return res.status(422).json({error: 'User already exists!'});

    
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    password = await bcrypt.hash(password, salt);

    //Generate an access token
    user = new User({email, name, password});
    user.save({options: {lean: true}}).then(newUser=>{
      const accessToken = Helper.generateAccessToken(newUser);
      const refreshToken = Helper.generateRefreshToken(newUser);
      const token = new Token({_id: refreshToken});
        token.save().then(result=>{
          return res.status(201).json({result: {...newUser.toObject(), accessToken, refreshToken}})
        })
    })
    .catch(error=>res.status(500).json({error:error}));
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    //basic validation
    const result = loginSchema.validate({email,password})
    if(result.error) return res.status(422).json({ error: result.error.details[0].message });

    var user = await User.findOne({email});
    if(!user) return res.status(400).json({ error: 'No user exists with the provided email!' });

    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Invalid Password" });
        //Generate an access token
        const accessToken = Helper.generateAccessToken(user);
        const refreshToken = Helper.generateRefreshToken(user);
        const token = new Token({_id: refreshToken});
        user = user.toObject()
        delete user.password
        token.save().then(result=>{
            return res.status(200).json({result:{...user,
                accessToken,  
                refreshToken,
                }});
        })
        .catch(error=>res.status(500).json({error:error}));
    } else {
      res.status(400).json({error: "Email or password incorrect!"});
    }
}

exports.userUpdate = (req, res) =>{
  let user = req.body.user;
  let userId = req.params.userId;

  const userValidationResult = userSchema.validate(user);
  if(userValidationResult.error)
    return res.status(422).json({ error: userValidationResult.error.details[0].message });
  console.log(user)
  User.findByIdAndUpdate(userId, {$set: user}, {new: true}).then(result=> {
    if(!result) return res.status(500).json({error: "Error occured while updating profile"})
    return res.status(200).json({result: result})})
    .catch(err => {console.log(err);return res.status(500).json({error: "Error occured while updating profile"})})
}

exports.userDelete = (req, res) => {
    User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.userLogout = (req, res) => {
    const refreshToken = req.body.token;
    Token.remove({ _id: refreshToken })
    .exec()
    .then(result => {
        res.status(200).json({result: "You logged out successfully."});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
  };

exports.userGet = async (req, res) =>{
  const currentUserId = req.user.id
  const userId = req.params.userId

  const user = await User.findById(userId);
  if(user)
    return res.status(200).json({result: user})
  else
    return res.status(404).json({error: "User doesn't exist"})
}

exports.userFollow = async (req, res) =>{
  const userId = req.body.userId; //to follow
  const currentUserId = req.params.userId //follower

  if (userId !== currentUserId) {
      const user = await User.findById(userId);
      const currentUser = await User.findById(currentUserId);
      if (!user.followers.includes(currentUserId)) {
        await user.updateOne({ $push: { followers: currentUserId } });
        await currentUser.updateOne({ $push: { followings: userId } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You allready follow this user");
      }
  } else {
    res.status(403).json("You cant follow yourself");
  }
}

exports.userUnfollow = async (req, res) => {
  const userId = req.body.userId
  const currentUserId = req.params.userId

  if(userId !== currentUserId){
    const user = await User.findById(userId)
    const currentUser = await User.findById(currentUserId)
    if (user.followers.includes(currentUserId)) {
      await user.updateOne({ $pull: { followers: currentUserId } });
      await currentUser.updateOne({ $pull: { followings: userId } });
      res.status(200).json("User has been unfollowed");
    } else {
      res.status(403).json("You dont follow this user");
    }
  }else{
    res.status(403).json("You cannot unfollow yourself!!!")
  }
}