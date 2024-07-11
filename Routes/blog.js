const express = require("express")

const blog = require("../Models/blog")

const Router = express.Router()

Router.route("/add-blog")
    .get((req, res) => {
        res.render("AddBlog", { data: req.user })
    })
    .post((req, res) => {
        const { title, content } = req.body
        blog.create({
            title,
            body: content,
            cover_img: req.file.filename,
            created_by: req.user.uid
        })
        res.redirect("/")
    })

Router.route("/:id").get(async (req, res) => {
    const id = req.params.id
    const result = await blog.findOne({ _id: id })
    res.render("Blog", { blog: result, data: req.user })
})

module.exports = Router