const express = require('express');
const cors = require("cors");
const app = express();
const PORT=4000;
const mongoose=require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

require('dotenv').config()

const Authrouter=require("./Router/authrouter");
app.use("/auth",Authrouter);

const userRouter=require("./Router/user");
app.use("/user",userRouter);

const url=process.env.Mongodburl;
mongoose.connect(url)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Backend Connected");
     })
})
.catch((err)=>{
    console.error('MongoDB connection error:', err);
})
