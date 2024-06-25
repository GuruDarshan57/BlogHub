const express = require("express")
const user = require("../Models/user")

const Router = express.Router();

Router.route("/").get((req, res) => {
    res.render("Home")
})

Router.route("/signin").get((req, res) => [
    res.render("SignIn")
]).post(async (req, res) => {
    const { email, password } = req.body
    const data = await user.matchPassword(email, password)
    res.json({ msg: data })

})

Router.route("/signup").get((req, res) => [
    res.render("SignUp")
]).post(async (req, res) => {
    const { fullname, email, password } = req.body
    await user.create({ fullname, email, password })
    res.redirect("/signin")
})

module.exports = Router