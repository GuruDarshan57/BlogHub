const express = require("express")
const app = express()
const path = require("path")

const mongoose = require("mongoose")
const connection = require('./connection')
connection().then(e => { console.log("Connection Established.") })

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: true }))

const Port = 3000;
app.listen(Port, () => {
    console.log("Server has started at Port " + Port)
})

const routes = require("./Routes/user")
app.use("/", routes)

