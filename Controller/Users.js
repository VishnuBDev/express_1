const db = require('../db')
const bcrypt = require('bcryptjs');
const validation = require('../Validation/Users')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET


const signup = async (req,res) => {
    const {error} = validation.signup.validate(req.body)
    if(error){
        res.status(500).send("validation error")
        return
    }
    try{
        const {Email, Password} = req.body
        const [checkUserExist] = await db.promise().query(`SELECT * FROM users WHERE Email=?`,[Email])
        if(checkUserExist.length>0){
            res.status(400).send("user already exist")
            return
        }
        const hashedPassword = await bcrypt.hash(Password,10)
        const addUser = await db.promise().query('INSERT INTO users(Email,Password) VALUES(?,?)',[Email,hashedPassword])
        res.status(201).send('user added')
    }catch(err){
        res.status(500).send("error fetching user details")
    }
}

const signin = async(req,res) =>{
    const {error} = validation.signup.validate(req.body)
    if(error){
        res.status(400).send("validation error")
        return
    }
    try{
        const {Email,Password} = req.body
        const [userData] = await db.promise().query('SELECT * FROM users WHERE Email =?',[Email])
        if(userData.length==0){
            res.status(404).send("user do not exist")
            return
        }
        const PasswordCheck = await bcrypt.compare(Password,userData[0].Password)
        if(PasswordCheck){
            const accessToken = jwt.sign({ UserId:userData[0].UserId, Email:userData[0].Email},jwtSecret,{expiresIn:"1h"})
            const refreshToken = jwt.sign({UserId:userData[0].UserId,Email:userData[0].Email},jwtSecret,{expiresIn:"7d"})
            await db.promise().query('UPDATE users SET refresh_token = ? WHERE Email = ?',[refreshToken,Email])
            res.status(200).send({message:"login success",accessToken,refreshToken})
            return
        }else{
            res.status(401).send("incorrect password")
            return
        }   
    }catch(err){
        res.status(400).send({"message":"error"})
        return
    }
}

const refresh = async(req,res) => {
    const {refreshToken} = req.body
    if(!refreshToken){
        return res.status(400).send("refresh token needed")
    }
    try{
        jwt.verify(refreshToken,jwtSecret, async(err,user)=>{
            if(err){
                return res.status(403).send("Invalid token")
            }
            const [tokendb] = await db.promise().query('SELECT * from users WHERE Email=?',[user.Email])
            if(!tokendb || refreshToken!==tokendb[0].refresh_token){
                console.log("token",tokendb)
                console.log("backend",tokendb[0].refresh_token)
                return res.status(403).send("Refresh token mismatch");
            }
            const newAccessToken = jwt.sign({UserId:user.UserId,Email:user.Email},jwtSecret,{expiresIn:"1h"})
            return res.status(200).send({message:"refresh token updated",accessToken:newAccessToken})
        })
    }catch(err){
        return res.status(500).send("error")
    }
}

module.exports = {signup,signin,refresh}
    

