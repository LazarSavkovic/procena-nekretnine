const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilities/ExpressError")
const catchAsync = require("./utilities/catchAsync")
const regress = require("./utilities/regress")
const { aptSchema } = require("./schemas");
const { flatSchema } = require("./schemas");
const Apt = require("./models/apt");
const Flat = require("./models/flat");
const weights = require("./seeds/data_science/weights.json")

const flats = require("./routes/flats")
const apts = require("./routes/apts")

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


app.use("/flats", flats)
app.use("/apts", apts)


app.get("/", (req, res) => {
    res.render("home");
})



// APTS ROUTES



// FLAT ROUTES





app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404))
})

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = "Doslo je do greske"
    res.status(status).render("error", { err });
})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})