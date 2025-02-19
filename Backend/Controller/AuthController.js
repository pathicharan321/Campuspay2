const {z}=require("zod");
const Account=require('../Schema/account');
const User=require('../Schema/user');
const jwt = require("jsonwebtoken");

const signupBody = z.object({
    username: z.string().email(),
	firstName: z.string(),
	lastName: z.string(),
	password: z.string()
})
module.exports.postsignup=async(req,res)=>{
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    try{
        const existingUser = await User.findOne({
            username: req.body.username
        })
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken"
            })
        }
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        const userId = user._id;
        const amount=Math.ceil(1 + Math.random() * 10000);
        const account=await Account.create({
            userId,
            balance: amount
        });
        res.status(200).json({message: "User created successfully"});
    }
    catch(err){
        return res.status(500).json({"message":err});
    }
}
const loginBody = z.object({
    email: z.string().email(),
    password: z.string()
})
module.exports.postlogin=async(req,res)=>{
    const bb =loginBody.safeParse(req.body);
    const { success, error } = bb;
    if (!success) {
    return res.status(411).json({
        message: "Incorrect inputs",
      });
    }
    try{
    const user = await User.findOne({
        username: req.body.email
    });
    if(user){
        if(user.password!=req.body.password){
            return res.status(400).json({message:"Incorrect email (or) Password"});
        }
        const userbody={
            userid:user._id
        }
        console.log(userbody);
        const token=jwt.sign(userbody,process.env.jwtsecret, { expiresIn: '24h' });
        console.log(token);
        return res.status(200).json({
            user,
            token
        });
   }
   else{
    return res.status(400).json({message:"This Email is not Signed Up.So please Sign Up"});
   }
   }
   catch(err){
    return res.status(500).json({message:"Internal Server Error"});
   }
}

module.exports.getverifytoken=(req,res)=>{
     const token = req.headers.authorization.split(" ")[1];
        if (token){
            try {
                const decoded = jwt.verify(token, process.env.jwtsecret);
                if(decoded.userid){
                    req.userid = decoded.userid;
                    return res.status(200).json({message:"User eneter successfilly"});
                }
                else{
                    return res.status(401).json({message:"No authorized"});
                }
            }
            catch (error) {
                return res.status(401).json({
                    message: `No authorized - ${error}`
                })
            }
        }
        else{
            return res.status(401).json({ message: 'Not Authorized, No token' });
        }
}