const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// define user Schema
const UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

//this gonna add the username and password and handle with the validation, etc..
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

