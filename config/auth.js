module.exports = {
    ensureAuthenticated : function(req , res , next){
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash("error_msg" , "You need to be logged to see this!")
        res.redirect("/users/login")
    }
}