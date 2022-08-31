const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilities/ExpressError")
const session = require("express-session");

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
app.use(express.static(path.join(__dirname, "public")));



const sessionConfig = {
    secret: "thisshouldbeabettersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }

}
app.use(session(sessionConfig))


app.use("/flats", flats)
app.use("/apts", apts)


app.get("/", (req, res) => {
    res.render("home");
})


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