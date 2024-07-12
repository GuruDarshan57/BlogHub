const express = require("express")

const blog = require("../Models/blog")
const comments = require("../Models/comments")

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
    try {
        const id = req.params.id
        const result = await blog.findOne({ _id: id }).populate("created_by")
        const comment = await comments.find({ blogid: id }).populate("created_by")
        res.render("Blog", { blog: result, data: req.user, comment: comment })
    }
    catch (err) {
        console.log(err.message)
        res.json({ msg: "Blog not found !!" })
    }

})

Router.route("/comments/:id").post((req, res) => {
    if (req.user) {
        comments.create({
            comment: req.body.comment,
            created_by: req.user.uid,
            blogid: req.params.id
        })
        res.redirect("/blog/" + req.params.id)

    }
    else {
        res.redirect("/signin")
    }
})

module.exports = Router