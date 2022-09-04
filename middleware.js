const ExpressError = require("./utilities/ExpressError")
const { flatSchema, aptSchema } = require("./schemas");
const Flat = require("./models/flat");


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "Niste ulogovani.");
        return res.redirect("/login");
    } next();
}

module.exports.validateFlat = (req, res, next) => {

    const { error } = flatSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }

}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const flat = await Flat.findById(id);
    if (!flat.author.equals(req.user._id)) {
        req.flash("error", "Korisnik nije autor nekretnine")
        return res.redirect("/flats")
    } next();
}

module.exports.validateApt = (req, res, next) => {

    const { error } = aptSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }

}