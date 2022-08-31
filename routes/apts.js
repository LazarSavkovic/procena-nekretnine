
const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync")
const ExpressError = require("../utilities/ExpressError")
const Apt = require("../models/apt");
const { aptSchema } = require("../schemas");

const validateApt = (req, res, next) => {

    const { error } = aptSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }

}


router.get("/", catchAsync(async (req, res) => {
    const apts = await Apt.find({})
    res.render("apts/index", { apts })
}))

router.get("/new", catchAsync(async (req, res) => {
    res.render("apts/new")
}))

router.post("/", validateApt, catchAsync(async (req, res, next) => {
    // if (!req.body.apt) throw new ExpressError("Unos podataka nije validan", 400);

    const newApt = new Apt(req.body.apt);
    await newApt.save()
    res.redirect(`/apts/${newApt._id}`)
}))

router.get("/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const foundApt = await Apt.findById(id);
    res.render("apts/edit", { foundApt })
    // res.send("got it")
}))

router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const foundApt = await Apt.findById(id);
    res.render("apts/show", { foundApt })
}))



router.put("/:id", validateApt, catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedApt = await Apt.findByIdAndUpdate(id, { ...req.body.apt })
    res.redirect(`/apts/${id}`)
}))

router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Apt.findByIdAndDelete(id);
    res.redirect("/apts")

}))

module.exports = router;