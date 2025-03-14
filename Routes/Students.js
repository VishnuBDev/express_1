const express = require("express")
const router = express.Router()
const student = require('../Controller/Students')

router.route('/').
get(student.getStudent).
post(student.addStudent)

router.route('/:id').
get(student.getOneStudent).
delete(student.deleteOneStudent).
put(student.editStudent)




module.exports =  router