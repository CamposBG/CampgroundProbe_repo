const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Making the Schema
const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
});

// compiling  and exporting our model
module.exports = mongoose.model("Campground", CampgroundSchema);
