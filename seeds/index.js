// This file will run on its own, separately from our node app  any time we want to seed our database
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities")
const {places, descriptors} = require("./seedHelpers");

// Connecting to the database
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

// pick a random element of an array (to randomly generate the camping names)
const sample = array => array[Math.floor(Math.random() * array.length)]

// seed our database
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let index = 0; index < 50; index++) { //create 50 camping sites
        const random66 = Math.floor(Math.random() * 66); //pick the 66 cities randomly
        const camp = new Campground({
            location: `${cities[random66].nome}`,
            title: `${sample(places)} ${sample(descriptors)}`
        })
        await camp.save();
    }
}
//run the function than close the database
seedDB().then(() =>{
    mongoose.connection.close();
});