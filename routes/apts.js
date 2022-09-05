const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const { validateApt } = require("../middleware");
const apts = require("../controllers/apts")


router.get("/", catchAsync(apts.index));

router.get("/new", catchAsync(apts.renderNewForm));

router.post("/", validateApt, catchAsync(apts.createApt));

router.get("/:id/edit", catchAsync(apts.renderEditForm));

router.get("/:id", catchAsync(apts.showApt));

router.put("/:id", validateApt, catchAsync(apts.updateApt));

router.delete("/:id", catchAsync(apts.deleteApt))

module.exports = router;