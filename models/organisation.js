const mongoose = require("mongoose");

const organisation = new mongoose.Schema({
    orgId:{
        required: true,
        type: String,
        unique: true
    },
    oname:{
        required: true,
        type: String
    },
    dept:{
        //required: true,
        type: Array
    },
    address:{
        required: true,
        type: Object
    }
});

module.exports = mongoose.model("organisations", organisation);