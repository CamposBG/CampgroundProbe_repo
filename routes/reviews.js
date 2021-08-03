const express = require("express");
const router = express.Router({mergeParams:true});// accept missing the params from campground route and the review

const Campground = require("../models/campground");
const Review = require("../models/review");
const {reviewSchema } = require("../schemas.js");

const ExpressError = require("../utils/ExpressError")
const catchAsync = require("../utils/catchAsync");


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        // if there is an error, we are going to map over the errors.details to make a single string message, we take that and pass to a new express error that we're throwing
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

//Nested route for the reviews linked with the campground
router.post('/', validateReview, catchAsync(async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	const review = new Review(req.body.review);
	campground.reviews.push(review); // add the new review to the campground
	await review.save();
	await campground.save();
	res.redirect(`/campgrounds/${campground._id}`);
})
);
//we need that reviewID, because we want to remove that reference to whatever the review is in the campground, ans we want to remove the review itself
router.delete('/reviewId', catchAsync(async (req, res) => {
	const { id, reviewId } = req.params;
	console.log(req.params);
	await Campground.findByIdAndUpdate(id, { $pull: { review: reviewId } }); // pull anything with the reviewID in the reviews list ( reviews are just an array of reviews, so it will look for this ID and pull that out it)
	await Review.findByIdAndDelete(reviewId);
	res.redirect(`/campgrounds/${id}`);
})
);

module.exports = router;
