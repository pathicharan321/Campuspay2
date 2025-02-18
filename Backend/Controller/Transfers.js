const Account=require('../Schema/account');
const { default: mongoose } = require('mongoose');
const uuid=require("uuid");

module.exports.getbalance=async(req,res)=>{
    const account = await Account.findOne({
        userId: req.userid
    });
    res.json({
        balance: account.balance
    })
}

module.exports.posttransfer=async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    console.log(req.userid);
    const account = await Account.findOne({ userId: req.userid }).session(session);
    if(amount<0){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Amount cannot be negative"
        });
    }
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    await Account.updateOne({ userId: req.userid }, { $inc: { balance: -amount } }, { session: session });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }, { session: session });
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
}


/*module.exports.createRazorpayOrder=async(req,res)=>{
    const order = await Razorpay.orders.create({
        amount: req.body.amount * 100, 
        currency: "INR",
        receipt: "receipt_" + uuid(10), 
        notes: {
            userId: req.userid, // Track which user created the order
            description: "Payment Order"
        }
    });
    res.json({
        orderId: order.id
    });
}

module.exports.confirmPayment=async(req,res)=>{
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        
        // Verify the payment signature
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            // Payment is successful
            await Account.updateOne(
                { userId: req.userid },
                { $inc: { balance: req.body.amount } }
            );
            
            res.json({
                message: "Payment successful",
                payment_id: razorpay_payment_id
            });
        } else {
            res.status(400).json({
                message: "Payment verification failed"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error processing payment",
            error: error.message
        });
    }
}  */     
