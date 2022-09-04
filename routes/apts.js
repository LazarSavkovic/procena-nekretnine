
const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync")
const Apt = require("../models/apt");
const { validateApt } = require("../middleware")


router.get("/", catchAsync(async (req, res) => {
    const apts = await Apt.find({})
    res.render("apts/index", { apts })
}))

router.get("/new", catchAsync(async (req, res) => {
    res.render("apts/new")
}))

router.post("/", validateApt, catchAsync(async (req, res, next) => {
    // if (!req.body.apt) throw new ExpressError("Unos podataka nije validan", 400);

    const apt = new Apt(req.body.apt);
    await apt.save()
    req.flash("success", "Uspesno kreirana nekretnina")
    res.redirect(`/apts/${apt._id}`)
}))

router.get("/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const apt = await Apt.findById(id);
    if (!apt) {
        req.flash("error", "Nekretnina nije nadjena")
        return res.redirect("/apts")
    }
    res.render("apts/edit", { apt });
}))

router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const apt = await Apt.findById(id);
    if (!apt) {
        req.flash("error", "Nekretnina nije nadjena")
        return res.redirect("/apts")
    }
    res.render("apts/show", { apt })
}))



router.put("/:id", validateApt, catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedApt = await Apt.findByIdAndUpdate(id, { ...req.body.apt })
    req.flash("success", "Uspesno modifikovana nekretnina")
    res.redirect(`/apts/${id}`)
}))

router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Apt.findByIdAndDelete(id);
    req.flash("success", "Uspesno izbrisana nekretnina")
    res.redirect("/apts")

}))

module.exports = router;