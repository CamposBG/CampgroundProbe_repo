const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Making the Schema
const reviewSchema = new Schema({
    body: String,
    rating: Number
});

// compiling  and exporting our model
module.exports = mongoose.model("Review", reviewSchema);
