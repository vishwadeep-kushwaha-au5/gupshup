const express = require("express");
const router = express.Router();

const CloudinaryController = require('../controller/cloudinary');
const { checkAuth } = require("../middleware/auth");

router.use(express.json());

router.post("/generateCloudinarySignature", CloudinaryController.getCloudinarySignature);

module.exports = router;