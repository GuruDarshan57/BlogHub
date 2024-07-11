const { verifyToken } = require("../Services/services")


const authenticate = (req, res, next) => {
    if (req.cookies.token) {
        const result = verifyToken(req.cookies.token)
        if (result) {
            req.user = result
        }
    }
    next()
}

module.exports = { authenticate }