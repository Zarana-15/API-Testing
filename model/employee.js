const mongoose = require("mongoose");

const employee = new mongoose.Schema({
    eid:{
        required: true,
        type: Number,
        unique: true
    },
    name:{
        required: true,
        type: String
    },
    oid:{
        required: true,
        type: String
    },
    oname:{
        required: true,
        type: String
    },
    did:{
        required: true,
        type: String
    }
});

module.exports = mongoose.model("employees", employee);