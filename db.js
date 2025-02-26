const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'student'
})


connection.connect((err)=>{
    if(err){
        console.log("error",err.stack)
        return
    }
        console.log("connected")
})

module.exports = connection