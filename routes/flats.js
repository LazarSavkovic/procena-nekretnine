const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync")
const regress = require("../utilities/regress")
const Flat = require("../models/flat");
const weights = require("../seeds/data_science/weights.json")
const { isLoggedIn, isAuthor, validateFlat } = require("../middleware")


router.get("/", isLoggedIn, catchAsync(async (req, res) => {
    const flats = await Flat.find({ author: req.user._id })
    res.render("flats/index", { flats })
}))

router.get("/new", isLoggedIn, catchAsync(async (req, res) => {
    res.render("flats/new")
}))

router.post("/", isLoggedIn, validateFlat, catchAsync(async (req, res, next) => {
    const flat = new Flat(req.body.flat);
    flat.author = req.user._id;
    flat.value = regress(flat, weights);
    await flat.save()
    req.flash("success", "Uspesno uneta nekretnina")
    res.redirect(`/flats/${flat._id}`)
}))

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findById(id);
    res.render("flats/edit", { flat })
}))

router.get("/:id", isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findById(id);
    res.render("flats/show", { flat })
}))



router.put("/:id", isLoggedIn, isAuthor, validateFlat, catchAsync(async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findByIdAndUpdate(id, { ...req.body.flat })
    flat.value = regress(flat, weights);
    await flat.save()
    req.flash("success", "Uspesno modifikovana nekretnina")
    res.redirect(`/flats/${id}`)
}))

router.delete("/:id", isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Flat.findByIdAndDelete(id);
    req.flash("success", "Uspesno izbrisana nekretnina")
    res.redirect("/flats")

}))



module.exports = router;