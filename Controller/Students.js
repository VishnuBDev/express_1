const db = require("../db")
const validation = require("../Validation/Students")

const getStudent  = async (req,res)=>{
      const page = (req.query.page)? req.query.page : 1
      const limit = (req.query.limit)? req.query.limit : 10
      const offset = (page-1) * limit 
      const [count] = await db.promise().query('SELECT COUNT(*) AS total_students FROM students')
      const sql = `SELECT * FROM students ORDER BY Id LIMIT ${limit} OFFSET ${offset}`
      
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).send('unable to view list of students')
        }else{
            const list = {
                'limit':limit,
                'total_students':count[0].total_students,
                'offset':offset,
                'page_number':page,
                'list':result
            }
            res.json(list)
        }
    })
}

const addStudent = (req, res) => {
    const { error } = validation.addNewStudent.validate(req.body)
    if(error){
        res.status(500).send(`validation failed ${error.details}`)
    }else{
    db.query("INSERT INTO students ( FirstName, LastName, DOB, Gender, Email, Phone, Department) VALUES (?,?,?,?,?,?,?)",[req.body.FirstName,req.body.LastName, req.body.DOB,
         req.body.Gender, req.body.Email, req.body.Phone, req.body.Department],
        (err, result) => {
            if (err) {
                res.status(500).send('unable to add new user')
            }else{
                res.send('student added')
            }
        })
    }
}

const getOneStudent = (req,res) =>{
    db.query('SELECT * FROM students WHERE Id = ?',[req.params.id],(err,result)=>{
        if(err){
            res.status(500).send("student not found")
        }else{
            res.json(result)
        }
    })
}

const deleteOneStudent = (req,res) =>{
    db.query('DELETE FROM students WHERE Id=?',[req.params.id],(err,result)=>{
        if(err){
            res.status(500).send("unable to delete")
        }else{
            res.send(`student ${req.params.id} deleted`)
        }
    })
}

const editStudent = (req,res) => {

    const { error } = validation.editStudent.validate(req.body)
    if(error){
        res.status(500).send(`validation failed ${error.details}`)
    }else{
    const keys = Object.keys(req.body)
    const vals = Object.values(req.body)
    vals.push(req.params.id)
    const query = keys.join(' = ?,') + ' = ? '

    if(keys.length == 0){
        res.status(500).send("no field specified")
    }else{
        const sql = 'UPDATE students SET ' + query + 'WHERE Id=?'
        
        db.query(sql,vals,(err,result)=>{
            if(err){
                res.status(500).send("error while updating")
            }else{
                res.send("student data updated")
            }
        })
    }
}
}

module.exports = {getStudent,addStudent,getOneStudent,deleteOneStudent,editStudent}