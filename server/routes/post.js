const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Token = require('../models/Token')

const AuthController = require('../controller/auth')
const PostController = require('../controller/post');
const { authentication, authorization } = require("../middleware/auth");

router.use(express.json());

router.post("/create", authentication, PostController.postCreate);

router.put("/update/:postId", authentication, PostController.postUpdate);

router.put("/likedislike/:postId", authentication, PostController.postLikeDislike); //this route handles both like and unlike

router.get("/post/:postId", authentication, PostController.getPost);

router.get("/timeline", authentication, PostController.getTimelinePost);

router.get("/allPostsByCurrentUser/:userId", authentication, PostController.getAllPostsByUser);

router.delete("/delete/:postId", authentication, PostController.postDelete);

module.exports = router;