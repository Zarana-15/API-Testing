const mongoose = require("mongoose");

const employee = new mongoose.Schema({
    emp_id:{
        required: true,
        type: Number,
        unique: true
    },
    name:{
        required: true,
        type: String
    },
    age:{
        required: true,
        type: Number
    },
    email:{
        type: String,
        required: true
    },
    org_id:{
        required: true,
        type: String
    },
    dept_id:{
        required: true,
        type: String
    },
    joining_date:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("employees", employee);