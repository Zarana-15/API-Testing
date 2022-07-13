const mongoose = require("mongoose");

const organisation = new mongoose.Schema({
    oid:{
        required: true,
        type: String
    },
    oname:{
        required: true,
        type: String
    },
    dept:{
        required: true,
        type: Array
    },
    address:{
        required: true,
        type: Object
    }
});

module.exports = mongoose.model("organisations", organisation);