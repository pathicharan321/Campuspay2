const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token){
        try {
            const decoded = jwt.verify(token, process.env.jwtsecret);
            if(decoded.userid){
                req.userid = decoded.userid;
                next();
            }
        }
        catch (error) {
            return res.status(401).json({
                message: `No authorized - ${error}`
            })
        }
    };
    if(!token){
        return res.status(401).json({ message: 'Not Authorized, No token' });
    }
};

module.exports = {
    authMiddleware
}