const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware');
const Transfer=require('../Controller/Transfers');
const UserConroller=require("../Controller/Usercontroller");

router.get("/balance", authMiddleware,Transfer.getbalance);

router.post("/transfer",authMiddleware,Transfer.posttransfer);

router.put("/update", authMiddleware,UserConroller.putupdate);

router.get("/bulk/:filter?", authMiddleware,UserConroller.getbulk);


//router.post("/create-razorpay-order",authMiddleware,UserConroller.createRazorpayOrder);

//router.post("/confirm-payment",authMiddleware,UserConroller.confirmPayment);

module.exports = router;