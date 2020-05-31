const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        required: true,
        trim: true
    },
    mail: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("Contacts", schema)