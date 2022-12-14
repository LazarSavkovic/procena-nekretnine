const Flat = require("../models/flat");
const Apt = require("../models/apt");
const regress = require("../utilities/regress");
const weights = require("../seeds/data_science/weights.json");
const { getPriceForFlat } = require("../utilities/neural_network/predict_prices");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

module.exports.index = async (req, res) => {
    const flats = await Flat.find({ author: req.user._id });
    const username = req.user.username;
    res.render("flats/index", { flats, username })
};

module.exports.renderNewForm = (req, res) => {
    res.render("flats/new")
};
module.exports.renderPredictForm = (req, res) => {
    res.render("flats/predictNew")
};

module.exports.createFlat = async (req, res, next) => {
    const fullLocation = req.body.flat.location  + ", Beograd, Srbija";
    const geoData = await geocoder.forwardGeocode({
        query: fullLocation,
        limit: 1
    }).send()
    const flat = new Flat(req.body.flat);
    flat.geometry = geoData.body.features[0].geometry;
    flat.author = req.user._id;
    // flat.value = Math.round(regress(flat, weights));
    flat.value = Math.round(getPriceForFlat(flat));
    await flat.save();
    req.flash("success", "Uspesno uneta nekretnina");
    res.redirect(`/flats/${flat._id}`);
};
module.exports.predictFlat = async (req, res, next) => {
    const fullLocation = req.body.flat.location  + ", Beograd, Srbija";
    const geoData = await geocoder.forwardGeocode({
        query: fullLocation,
        limit: 1
    }).send()
    const flat = new Flat(req.body.flat);
    flat.geometry = geoData.body.features[0].geometry;
    // flat.author = req.user._id;
    flat.value = Math.round(getPriceForFlat(flat));
    req.flash("success", "Uspesno kreirana nekretnina");
    req.session.flat = flat;
    res.redirect("/flats/predicted");
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
    const username = req.user.username;
    res.render("flats/show", { flat, apts, username });
};
module.exports.predicted = async (req, res) => {
    const flat = req.session.flat;
    const apts = await Apt.find({})
    res.render("flats/predicted", { flat, apts });
};

module.exports.updateFlat = async (req, res) => {
    const { id } = req.params;
    const flat = await Flat.findByIdAndUpdate(id, { ...req.body.flat }, { new: true })
    // flat.value = Math.round(regress(flat, weights));
    const fullLocation = req.body.flat.location + ", Beograd, Srbija";
    const geoData = await geocoder.forwardGeocode({
        query: fullLocation,
        limit: 1
    }).send()
    flat.geometry = geoData.body.features[0].geometry;
    flat.value = Math.round(getPriceForFlat(flat));
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