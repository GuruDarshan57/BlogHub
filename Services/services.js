const jwt = require("jsonwebtoken")

const secKey = "guru"

const generateToken = (user) => {
    const payload = {
        name: user.fullname,
        email: user.email,
        role: user.role,
        uid: user._id
    }
    return jwt.sign(payload, secKey)
}

const verifyToken = (token) => {
    try {
        const res = jwt.verify(token, secKey)
        return res
    }
    catch (error) {
        console.log(error.message)
        return
    }
}

module.exports = { generateToken, verifyToken }