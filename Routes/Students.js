const express = require("express")
const router = express.Router()
const student = require('../Controller/Students')
const Validate = require('../Middleware/UserType')

router.route('/').
get(student.getStudent).
post(Validate.ValidateToken,Validate.Authorize(["admin"]),student.addStudent)

router.route('/:id').
get(student.getOneStudent).
delete(student.deleteOneStudent).
put(student.editStudent)




module.exports =  router