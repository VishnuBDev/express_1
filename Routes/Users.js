const express = require("express")
const router = express.Router()
const user = require('../Controller/Users')

router.route('/').
get(user.getUser).
post(user.addUser)

router.route('/:id').
get(user.getOneUser).
delete(user.deleteOneUser).
put(user.editUser)




module.exports =  router