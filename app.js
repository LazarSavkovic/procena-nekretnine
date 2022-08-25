const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const Apt = require("./models/apt");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilities/ExpressError")
const catchAsync = require("./utilities/catchAsync")

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
app.get("/apts", catchAsync(async (req, res) => {
    const apts = await Apt.find({})
    res.render("apts/index", { apts })
}))

app.get("/apts/new", catchAsync(async (req, res) => {
    res.render("apts/new")
}))

app.post("/apts", catchAsync(async (req, res, next) => {
    const newApt = new Apt(req.body.apt);
    await newApt.save()
    res.redirect("apts")
}))

app.get("/apts/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const foundApt = await Apt.findById(id);
    res.render("apts/edit", { foundApt })
    // res.send("got it")
}))

app.get("/apts/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const foundApt = await Apt.findById(id);
    res.render("apts/show", { foundApt })
}))



app.put("/apts/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedApt = await Apt.findByIdAndUpdate(id, { ...req.body.apt })
    res.redirect(`/apts/${id}`)
}))

app.delete("/apts/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Apt.findByIdAndDelete(id);
    res.redirect("/apts")

}))


app.use((err, req, res, next) => {
    res.send("Nesto nije u redu!")
})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})