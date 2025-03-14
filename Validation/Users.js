const joi = require('joi')

const signup = joi.object({
    Email: joi.string().email().required(),
    Password:joi.string().min(6).max(20).required()
})

module.exports = {signup}