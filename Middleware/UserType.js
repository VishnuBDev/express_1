const jwt = require("jsonwebtoken")
require('dotenv').config()
const jwt_secret = process.env.JWT_SECRET

const ValidateToken = (req,res,next) =>{
    const token = req.header("Authorization")
    if(!token){
        return res.status(401).send("access denied")
    }
    try{
        const user = jwt.verify(token,jwt_secret)
        req.user = user
        next()
    }catch(err){
        res.status(400).send("token invalid")
    } 
}    

const Authorize = (roles = []) =>{
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
}

module.exports = {ValidateToken,Authorize}