const express = require("express")
const app = express()
const path = require("path")
const cookieParser = require('cookie-parser')
const multer = require("multer")

require("dotenv").config()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/cover_images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

const mongoose = require("mongoose")
const connection = require('./connection')
connection().then(e => { console.log("Connection Established.") })

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));

const { authenticate } = require("./Middlewares/middlewares")
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())
app.use(authenticate)

const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log("Server has started at Port " + Port)
})


const user_routes = require("./Routes/user")
const blog_routes = require("./Routes/blog")

app.use("/", user_routes)
app.use("/blog", upload.single('cimg'), blog_routes)

