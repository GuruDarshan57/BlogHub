const express = require("express")

const Router = express.Router();

Router.route("/").get((req, res) => {
    res.render("Home")
})

Router.route("/signin").get((req, res) => [
    res.render("SignIn")
]).post((req, res) => {
    console.log(req.body)
})

Router.route("/signup").get((req, res) => [
    res.render("SignUp")
]).post((req, res) => {
    console.log(req.body)
})

module.exports = Router