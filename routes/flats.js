const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync")
const regress = require("../utilities/regress")
const ExpressError = require("../utilities/ExpressError")
const Flat = require("../models/flat");
const { flatSchema } = require("../schemas");
const weights = require("../seeds/data_science/weights.json")

const validateFlat = (req, res, next) => {

    const { error } = flatSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }

}

router.get("/", catchAsync(async (req, res) => {
    const flats = await Flat.find({})
    res.render("flats/index", { flats })
}))

router.get("/new", catchAsync(async (req, res) => {
    res.render("flats/new")
}))

router.post("/", validateFlat, catchAsync(async (req, res, next) => {
    const flat = new Flat(req.body.flat);
    flat.value = regress(flat, weights);
    await flat.save()
    req.flash("success", "Uspesno uneta nekretnina")
    res.redirect(`/flats/${flat._id}`)
}))

router.get("/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findById(id);
    res.render("flats/edit", { flat })
    // res.send("got it")
}))

router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findById(id);
    res.render("flats/show", { flat })
}))



router.put("/:id", validateFlat, catchAsync(async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findByIdAndUpdate(id, { ...req.body.flat })
    flat.value = regress(flat, weights);
    await flat.save()
    req.flash("success", "Uspesno modifikovana nekretnina")
    res.redirect(`/flats/${id}`)
}))

router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Flat.findByIdAndDelete(id);
    req.flash("success", "Uspesno izbrisana nekretnina")
    res.redirect("/flats")

}))



module.exports = router;