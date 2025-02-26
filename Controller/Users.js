const db = require("../db")

const getUser  = (req,res)=>{
    db.query('SELECT * FROM student',(err,result)=>{
        if(err){
            res.status(500).send('error')
        }else{
            res.json(result)
        }
    })
}

module.exports = {getUser}