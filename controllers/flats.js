const Flat = require("../models/flat");
const Apt = require("../models/apt");
const regress = require("../utilities/regress");
const weights = require("../seeds/data_science/weights.json");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

module.exports.index = async (req, res) => {
    const flats = await Flat.find({ author: req.user._id })
    res.render("flats/index", { flats })
};

module.exports.renderNewForm = (req, res) => {
    res.render("flats/new")
};

module.exports.createFlat = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.flat.location,
        limit: 1
    }).send()
    const flat = new Flat(req.body.flat);
    flat.geometry = geoData.body.features[0].geometry;
    flat.author = req.user._id;
    flat.value = Math.round(regress(flat, weights));
    await flat.save()
    console.log(flat)
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
    const apts = await Apt.find({})
    res.render("flats/show", { flat, apts });
};

module.exports.updateFlat = async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findByIdAndUpdate(id, { ...req.body.flat })
    flat.value = Math.round(regress(flat, weights));
    const geoData = await geocoder.forwardGeocode({
        query: req.body.flat.location,
        limit: 1
    }).send()
    flat.geometry = geoData.body.features[0].geometry;
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