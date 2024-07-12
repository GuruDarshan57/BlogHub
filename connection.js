const { default: mongoose } = require("mongoose");

module.exports = function establishConnection() {
    return mongoose.connect(process.env.Mongo_URL)
}