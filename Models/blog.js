const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
    , body: {
        type: String
    }
    , cover_img: {
        type: String,
        required: true
    }
    , created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const blog = mongoose.model("blog", Schema)

// async function delAll() {
//     await blog.deleteMany()
// }

// delAll()

module.exports = blog
