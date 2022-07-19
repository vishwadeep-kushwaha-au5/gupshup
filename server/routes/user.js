const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Token = require('../models/Token')

const AuthController = require('../controller/auth')
const UserController = require('../controller/user');
const { authentication, authorization } = require("../middleware/auth");

router.use(express.json());

router.post("/refreshAuthToken", AuthController.refreshToken);

router.post("/signup", UserController.userSignup);

router.post("/login", UserController.userLogin);

router.get("/:userId", authentication, UserController.userGet);

router.put("/update/:userId", authentication, authorization, UserController.userUpdate);

router.put("/follow/:userId", authentication, authorization, UserController.userFollow);

router.put("/unfollow/:userId", authentication, authorization, UserController.userUnfollow);

router.delete("/delete/:userId", authentication, authorization, UserController.userDelete);

router.post("/logout/:userId", authentication, authorization, UserController.userLogout);

module.exports = router;