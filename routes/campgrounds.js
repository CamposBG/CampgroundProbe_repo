const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const Campground = require('../models/campground');

//importing our controllers 
const campgrounds = require("../controllers/campgrounds")

router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));


router.get('/new', isLoggedIn, campgrounds.renderNewForm)

//this route needs to come after /new otherwise the new will be threated as an id
router.route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.renderEditForm))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));



router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.updateCampground))

module.exports = router;