const Apt = require("../models/apt");

module.exports.index = async (req, res) => {
    const apts = await Apt.find({})
    res.render("apts/index", { apts })
};

module.exports.renderNewForm = async (req, res) => {
    res.render("apts/new")
};

module.exports.createApt = async (req, res, next) => {
    const apt = new Apt(req.body.apt);
    await apt.save()
    req.flash("success", "Uspesno kreirana nekretnina")
    res.redirect(`/apts/${apt._id}`)
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const apt = await Apt.findById(id);
    if (!apt) {
        req.flash("error", "Nekretnina nije nadjena")
        return res.redirect("/apts")
    }
    res.render("apts/edit", { apt });
};

module.exports.showApt = async (req, res) => {
    const { id } = req.params;
    const apt = await Apt.findById(id);
    if (!apt) {
        req.flash("error", "Nekretnina nije nadjena")
        return res.redirect("/apts")
    }
    res.render("apts/show", { apt })
};

module.exports.updateApt = async (req, res) => {
    const { id } = req.params;
    const updatedApt = await Apt.findByIdAndUpdate(id, { ...req.body.apt })
    req.flash("success", "Uspesno modifikovana nekretnina")
    res.redirect(`/apts/${id}`)
};


module.exports.deleteApt = async (req, res) => {
    const { id } = req.params;
    await Apt.findByIdAndDelete(id);
    req.flash("success", "Uspesno izbrisana nekretnina");
    res.redirect("/apts");
};