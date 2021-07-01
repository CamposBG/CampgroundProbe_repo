// Getting the packages and models
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
// const { title } = require("process");

mongoose.connect("mongodb://localhost:27017/Campground-probe", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// Checking the connection to database
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("database connected")
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

//basic routes
app.get("/", (req, res) => {
    res.render("home")
})

app.get("/makeCampground", async (req, res) => {
    const camp = new Campground({title:"Happy Backyard"});
    await camp.save();
    res.send(camp)
})

app.listen(3000, ()=> {
    console.log("Serving on port 3000")
})