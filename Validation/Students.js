const Joi = require("joi")


const addNewStudent = Joi.object({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    DOB: Joi.date().required(), 
    Gender: Joi.string().valid('Male', 'Female', 'Other').required(), 
    Email: Joi.string().email().required(),  
    Phone: Joi.string().pattern(/^[0-9]{10}$/).required(), 
    Department: Joi.string().required()
})

const editStudent = Joi.object({
    FirstName: Joi.string(),
    LastName: Joi.string(),
    DOB: Joi.date(), 
    Gender: Joi.string().valid('Male', 'Female', 'Other'), 
    Email: Joi.string().email(), 
    Phone: Joi.string().pattern(/^[0-9]{10}$/), 
    Department: Joi.string()
})
  
module.exports = {addNewStudent,editStudent}
