const express = require('express');
const router = express.Router();
const AuthController=require("../Controller/AuthController");

router.post("/signup",AuthController.postsignup);

router.post("/login",AuthController.postlogin);

module.exports = router;