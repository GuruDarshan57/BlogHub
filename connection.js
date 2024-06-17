const { default: mongoose } = require("mongoose");

module.exports = function establishConnection() {
    return mongoose.connect("mongodb://localhost:27017/Blogify")
}