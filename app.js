// Getting the packages and models
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate"); // this is one ejs engine that we gonna use
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");

const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");


// const campground = require("./models/campground");
// const { campgroundSchema, reviewSchema } = require("./schemas.js");
// const { networkInterfaces } = require("os");
// const Review = require("./models/review");
// const review = require("./models/review");
// const { title } = require("process");

mongoose.connect("mongodb://localhost:27017/Campground-probe", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// Checking the connection to database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

// starting express
const app = express();

// choosing the ejs-mate engine. This engine let me define a layout file
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// express to parse the post request body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // _method is our query string

app.use("/campgrounds", campgrounds)//selecting the route
app.use("/campgrounds/:id/reviews", reviews)//selecting the route



//basic routes and  CRUD
app.get("/", (req, res) => {
    res.render("home");
});

app.all("*", (req, res, next) => {
    //every request and every path
    next(new ExpressError("Page not found", 404)); // this ExpressError gonna be the err argument of the error handler
});
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message - "Oh No, Something Went Wrong";
    res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
});
//test
