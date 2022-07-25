const mongoose = require("mongoose");

const department = new mongoose.Schema({
    deptId:{
        required: true,
        type: String,
        unique: true
    },
    
    orgId:{
        required: true,
        type: String
    },
    
    dname:{
        required: true,
        type: String
    }
});

module.exports = mongoose.model("departments", department);