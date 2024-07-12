const mongoose = require("mongoose")
const user = require("./user")

const Schema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    }
    , created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true
    }
    , blogid: {
        type: String,
        required: true
    }
})

const comments = mongoose.model("comments", Schema)

// async function delAll() {
//     await comments.deleteMany()
// }

// delAll()

module.exports = comments
