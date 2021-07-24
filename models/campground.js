const mongoose = require("mongoose");
const Review = require("./review")
const Schema = mongoose.Schema;

// Making the Schema
const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  //link the reviews with the campground
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref:"Review"
    }
  ]
});

//mongoose query middleware to delete a campground and all associated reviews:
CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id:{
        $in:doc.reviews // delete all reviews where their ID field is in ou document that was just deleted
      }
    })
  }
})

// compiling  and exporting our model
module.exports = mongoose.model("Campground", CampgroundSchema);
