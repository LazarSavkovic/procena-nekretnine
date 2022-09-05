const Flat = require("../models/flat");
const regress = require("../utilities/regress");
const weights = require("../seeds/data_science/weights.json");

module.exports.index = async (req, res) => {
    const flats = await Flat.find({ author: req.user._id })
    res.render("flats/index", { flats })
};

module.exports.renderNewForm = (req, res) => {
    res.render("flats/new")
};

module.exports.createFlat = async (req, res, next) => {
    const flat = new Flat(req.body.flat);
    flat.author = req.user._id;
    flat.value = regress(flat, weights);
    await flat.save()
    req.flash("success", "Uspesno uneta nekretnina")
    res.redirect(`/flats/${flat._id}`);
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findById(id);
    res.render("flats/edit", { flat });
};

module.exports.showFlat = async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findById(id);
    res.render("flats/show", { flat });
};

module.exports.updateFlat = async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findByIdAndUpdate(id, { ...req.body.flat })
    flat.value = regress(flat, weights);
    await flat.save()
    req.flash("success", "Uspesno modifikovana nekretnina");
    res.redirect(`/flats/${id}`);
};

module.exports.deleteFlat = async (req, res) => {
    const { id } = req.params;
    await Flat.findByIdAndDelete(id);
    req.flash("success", "Uspesno izbrisana nekretnina");
    res.redirect("/flats");
};