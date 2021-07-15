const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required: true,
        unique : true
    },
    confirmpassword : {
        type : String,
        required: true,
        unique : true
    }
})

//now we need to create a collection
const Register = new mongoose.model("Register",employeeSchema );

module.exports = Register;