const db = require("../db")

const getUser  = (req,res)=>{
    db.query('SELECT * FROM student',(err,result)=>{
        if(err){
            res.status(500).send('unable to view list of students')
        }else{
            res.json(result)
        }
    })
}

const addUser = (req, res) => {
    db.query("INSERT INTO student ( FirstName, LastName, DOB, Gender, Email, Phone, Department) VALUES (?,?,?,?,?,?,?)",[req.body.FirstName,req.body.LastName, req.body.DOB,
         req.body.Gender, req.body.Email, req.body.Phone, req.body.Department],
        (err, result) => {
            if (err) {
                res.status(500).send('unable to add new user')
            }else{
                res.send('student added')
            }
        })
}

const getOneUser = (req,res) =>{
    db.query('SELECT * FROM student WHERE Id = ?',[req.params.id],(err,result)=>{
        if(err){
            res.status(500).send("student not found")
        }else{
            res.json(result)
        }
    })
}

const deleteOneUser = (req,res) =>{
    db.query('DELETE FROM student WHERE Id=?',[req.params.id],(err,result)=>{
        if(err){
            res.status(500).send("unable to delete")
        }else{
            res.send(`student ${req.params.id} deleted`)
        }
    })
}

const editUser = (req,res) => {
    const keys = Object.keys(req.body)
    const vals = Object.values(req.body)
    vals.push(req.params.id)
    const query = keys.join(' = ?,') + ' = ? '

    if(keys.length == 0){
        res.status(500).send("no field specified")
    }else{
        const sql = 'UPDATE student SET ' + query + 'WHERE Id=?'
        
        db.query(sql,vals,(err,result)=>{
            if(err){
                res.status(500).send("error while updating")
            }else{
                res.send("student data updated")
            }
        })
    }
}

module.exports = {getUser,addUser,getOneUser,deleteOneUser,editUser}