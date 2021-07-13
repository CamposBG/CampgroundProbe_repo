// Getting the packages and models
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate');// this is one ejs engine that we gonna use
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError")
const Campground = require("./models/campground");
const methodOverride = require("method-override");
const campground = require("./models/campground");
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

// express to parse the post request body
app.use(express.urlencoded({ extended: true }));

// setting up ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method")); // _method is our query string

//basic routes and  CRUD
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

app.post("/campgrounds", catchAsync(async (req, res, next) => {
    if(!req.body.campground) throw new ExpressError("Invalid campground data", 400)
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`campgrounds/${campground._id}`);

}));

app.get("/campgrounds/:id", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campground });
}));

app.get("/campgrounds/:id/edit", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
}));

app.put("/campgrounds/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
        ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
}));

app.delete("/campgrounds/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
}));

app.all("*", (req, res, next) =>{//every request and every path 
    next(new ExpressError("Page not found", 404)); // this ExpressError gonna be the err argument of the error handler 
}) 
app.use((err, req, res, next)=>{
    const {statusCode = 500} = err;
    if (!err.message) err.message - "Oh No, Something Went Wrong"
    res.status(statusCode).render("error", {err});
})

app.listen(3000, () => {
    console.log("Serving on port 3000");
});
