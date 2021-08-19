const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const Campground = require('../models/campground');
const multer = require("multer");//to parse multipart forms 
const { storage } = require("../cloudinary")
const upload = multer({ storage })

//importing our controllers 
const campgrounds = require("../controllers/campgrounds")

router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

//this route needs to come after /new otherwise the new will be threated as an id
router.route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;
