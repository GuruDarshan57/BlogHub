const mongoose = require("mongoose");

const Schema = new Mongoose.schema({
    fullname: {
        type: String,
        required: true
    }
    , email: {
        type: String,
        required: true,
        unique: true
    }, password: {
        type: String,
        required: true
    }
})

const user = Mongoose.model("users", Schema)

module.exports = user