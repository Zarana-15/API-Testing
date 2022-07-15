const mongoose = require("mongoose");

const department = new mongoose.Schema({
    did:{
        required: true,
        type: String
    },
    
    oid:{
        required: true,
        type: String
    },
    
    dname:{
        required: true,
        type: String
    }
});

module.exports = mongoose.model("departments", department);