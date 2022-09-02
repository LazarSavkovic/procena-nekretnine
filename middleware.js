module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Niste ulogovani.")
        return res.redirect("/login")
    } next();
}