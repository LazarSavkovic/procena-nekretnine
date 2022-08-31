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


const validateApt = (req, res, next) => {

    const { error } = aptSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }

}
const validateFlat = (req, res, next) => {

    const { error } = flatSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }

}


app.get("/", (req, res) => {
    res.render("home");
})



// APTS ROUTES


app.get("/apts", catchAsync(async (req, res) => {
    const apts = await Apt.find({})
    res.render("apts/index", { apts })
}))

app.get("/apts/new", catchAsync(async (req, res) => {
    res.render("apts/new")
}))

app.post("/apts", validateApt, catchAsync(async (req, res, next) => {
    // if (!req.body.apt) throw new ExpressError("Unos podataka nije validan", 400);

    const newApt = new Apt(req.body.apt);
    await newApt.save()
    res.redirect(`/apts/${newApt._id}`)
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



app.put("/apts/:id", validateApt, catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedApt = await Apt.findByIdAndUpdate(id, { ...req.body.apt })
    res.redirect(`/apts/${id}`)
}))

app.delete("/apts/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Apt.findByIdAndDelete(id);
    res.redirect("/apts")

}))


// FLAT ROUTES


app.get("/flats", catchAsync(async (req, res) => {
    const flats = await Flat.find({})
    res.render("flats/index", { flats })
}))

app.get("/flats/new", catchAsync(async (req, res) => {
    res.render("flats/new")
}))

app.post("/flats", validateFlat, catchAsync(async (req, res, next) => {
    // if (!req.body.apt) throw new ExpressError("Unos podataka nije validan", 400);

    const flat = new Flat(req.body.flat);
    flat.value = regress(flat, weights);
    await flat.save()
    res.redirect(`/flats/${flat._id}`)
}))

app.get("/flats/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findById(id);
    res.render("flats/edit", { flat })
    // res.send("got it")
}))

app.get("/flats/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findById(id);
    res.render("flats/show", { flat })
}))



app.put("/flats/:id", validateFlat, catchAsync(async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findByIdAndUpdate(id, { ...req.body.flat })
    flat.value = regress(flat, weights);
    await flat.save()
    res.redirect(`/flats/${id}`)
}))

app.delete("/flats/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Flat.findByIdAndDelete(id);
    res.redirect("/flats")

}))







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