const mongoose = require("mongoose");

const employee = new mongoose.Schema({
    empId:{
        //required: true,
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
        //required: true
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
        //required: true
    },
    searchTags:{
        type: Array
    },
    experience:{
        type: Number,
        required : true,
    },
    description:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    notes:{
        type: Array
    },
    skills:{
        type: Array,
        required: true
    },
    preferredLocations:{
        type: Array,
        required:true
    },
    ipAddr:{
        type: Object,
        required: true
    }
});

module.exports = mongoose.model("employees", employee);