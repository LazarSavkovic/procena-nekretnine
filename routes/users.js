const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utilities/catchAsync")
const User = require("../models/user");


router.get("/register", (req, res) => {
    res.render("users/register")
})

router.post("/register", catchAsync(async (req, res) => {
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
}));

router.get("/login", (req, res) => {
    res.render("users/login");
})
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login", keepSessionInfo: true }), (req, res) => {
    req.flash("success", "Dobrodosli!");
    const redirectUrl = req.session.returnTo || "/flats";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash("success", "Uspesno ste se izlogovali")
        res.redirect('/apts');
    });

})


module.exports = router;