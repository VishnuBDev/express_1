const express = require('express')
const router = express.Router()
const users = require('../Controller/Users')

router.route('/signup').
post(users.signup)

router.route('/signin').
post(users.signin)

router.route('/refresh').
post(users.refresh)

module.exports = router



