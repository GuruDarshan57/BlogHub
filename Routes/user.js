const express = require("express")
const user = require("../Models/user")
const blog = require("../Models/blog")

const Router = express.Router();

Router.route("/").get(async (req, res) => {
    if (req.user) {
        const blogs = await (blog.find({ created_by: req.user.uid }))
        res.render("Home", { data: req.user, blogs: blogs })
    }
    else {
        res.render("Home", {})
    }

})

Router.route("/signin").get((req, res) => [
    res.render("SignIn")
]).post(async (req, res) => {
    const { email, password } = req.body
    const data = await user.matchPassword(email, password)

    if (data) {
        if (data === "incorrect password") {
            res.render("SignIn", { msg: "Incorrect Password" })
        }
        else {
            res.cookie("token", data).redirect("/")
        }
    }
    else {
        res.render("SignIn", { msg: "User not Found !!" })
    }

})

Router.route("/signup").get((req, res) => [
    res.render("SignUp")
]).post(async (req, res) => {
    const { fullname, email, password } = req.body
    await user.create({ fullname, email, password })
    res.redirect("/signin")
})

Router.route("/signout").get((req, res) => {
    res.cookie("token", "").redirect("/")
})

module.exports = Router