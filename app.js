const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const Apt = require("./models/apt");
const methodOverride = require("method-override");
const { findOneAndUpdate } = require("./models/apt");
const ejsMate = require("ejs-mate");

mongoose.connect("mongodb://localhost:27017/procena-nekretnine", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
})


const app = express();

app.engine("ejs", ejsMate)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.render("home");
})
app.get("/apts", async (req, res) => {
    const apts = await Apt.find({})
    res.render("apts/index", { apts })
})
app.get("/apts/new", async (req, res) => {
    res.render("apts/new")
})
app.post("/apts", async (req, res) => {
    const newApt = new Apt(req.body.apt);
    console.log(req.body)
    await newApt.save()
    res.redirect("apts")
})
app.get("/apts/:id/edit", async (req, res) => {
    const { id } = req.params;
    const foundApt = await Apt.findById(id);
    res.render("apts/edit", { foundApt })
    // res.send("got it")
})

app.get("/apts/:id", async (req, res) => {
    const { id } = req.params;
    const foundApt = await Apt.findById(id);
    res.render("apts/show", { foundApt })
})



app.put("/apts/:id", async (req, res) => {
    const { id } = req.params;
    const updatedApt = await Apt.findByIdAndUpdate(id, { ...req.body.apt })
    res.redirect(`/apts/${id}`)
})

app.delete("/apts/:id", async (req, res) => {
    const { id } = req.params;
    await Apt.findByIdAndDelete(id);
    res.redirect("/apts")

})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})