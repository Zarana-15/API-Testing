const mongoose = require("mongoose");

const employee = new mongoose.Schema({
    empId:{
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
    orgId:{
        required: true,
        type: String
    },
    deptId:{
        required: true,
        type: String
    },
    joiningDate:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("employees", employee);