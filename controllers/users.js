const User = require("../models/user");
const passport = require("passport");

module.exports.renderRegister = (req, res) => {
    res.render("users/register")
};

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Dobrodosli!");
            res.redirect("/flats");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
};

module.exports.renderLogin = (req, res) => {
    res.render("users/login");
};

module.exports.login = (req, res) => {
    req.flash("success", "Dobrodosli!");
    const redirectUrl = req.session.returnTo || "/flats";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash("success", "Uspesno ste se izlogovali")
        res.redirect('/apts');
    });

};