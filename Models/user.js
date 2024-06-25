const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto")

const schema = new Schema({
    fullname: {
        type: String,
        required: true
    }
    , email: {
        type: String,
        required: true,
        unique: true
    }, salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
    , profileImg: {
        type: String,
        default: '/images/default.png'
    }
    , role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true })

schema.pre('save', function (next) {
    const user = this;
    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedpassword = createHmac("sha256", salt).update(user.password).digest("hex")

    this.salt = salt
    this.password = hashedpassword
    next();
});

schema.static('matchPassword', async function (email, password) {
    const user = await this.findOne({ email: email })
    if (!user) return -1

    const inputPassword = createHmac("sha256", user.salt).update(password).digest("hex")
    const realPassword = user.password

    return inputPassword === realPassword ? true : false
})

const user = model('users', schema)

// async function delAll() {
//     await user.deleteMany({})
// }

// delAll()

module.exports = user