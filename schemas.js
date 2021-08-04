const Joi = require("joi")

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        // gonna pass keys nested to campground, remember that in our body we define everything inside campground
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required(),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required(),
})