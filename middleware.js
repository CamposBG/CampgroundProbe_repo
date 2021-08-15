module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) { //isAuthenticated is a method of passport that check if the user is signed in 
        req.flash("error", "you must be signed in first")
        return res.redirect("/login")
    }
    next();
}

