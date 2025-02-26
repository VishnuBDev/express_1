const express = require("express")
const router = express.Router()
const user = require('../Controller/Users')

router.route('/').
get(user.getUser).
post((req,res)=>{
    db.query('INSERT INTO student')
}).
delete((req,res)=>{
    res.send("delete users")
})




module.exports =  router