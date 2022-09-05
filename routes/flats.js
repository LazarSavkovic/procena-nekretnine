const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const { isLoggedIn, isAuthor, validateFlat } = require("../middleware");
const flats = require("../controllers/flats")


router.route("/")
    .get(isLoggedIn, catchAsync(flats.index))
    .post(isLoggedIn, validateFlat, catchAsync(flats.createFlat));

router.get("/new", isLoggedIn, flats.renderNewForm);

router.route("/:id")
    .get(isLoggedIn, isAuthor, catchAsync(flats.showFlat))
    .put(isLoggedIn, isAuthor, validateFlat, catchAsync(flats.updateFlat))
    .delete(isLoggedIn, isAuthor, catchAsync(flats.deleteFlat));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(flats.renderEditForm));

module.exports = router;