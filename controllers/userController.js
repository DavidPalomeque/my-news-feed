const userCtrl = {}
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const passport = require("passport")

// SIGN UP
userCtrl.signup = async(req , res) => {
    // Data
    const {name , email , password , password2} = req.body
    const errors = []

    // Validations
    if (!name || !email || !password || !password2) errors.push("All the fields need to be complete!")
    const emailIsInUse = await User.findOne({email : email})
    if (emailIsInUse) errors.push("This is Email is already in use!")
    if (password.length < 6) errors.push("The Password must contain at least 6 characters!")
    if (password !== password2) errors.push("Both passwords must match!")


    if (errors.length > 0) {
        // error messages
        req.flash("error_msg" , errors[0])
        var queries = "?name="+name+"&email="+email+"&password="+password+"&password2="+password2
        res.redirect("/users/signup"+queries)

    } else {
        // create user
        const newUser = new User({ name , email , password })

        bcrypt.genSalt(10 , (err , salt) => {
            // Hash Password
            bcrypt.hash(newUser.password , salt , (err , hash) => {
                if(err) throw err
                newUser.password = hash

                // Save new User in the DB
                newUser.save()
                 .then(newUser => {
                    req.flash("success_msg" , "Done! Now you only have to login.") 
                    res.redirect("/users/login")
                 })
                 .catch(err => {
                     console.log(err)
                     req.flash("error_msg" , "Sorry , some error happened.") 
                     res.redirect("/users/signup")
                 })
            })
        })
    }

}


// LOGIN
userCtrl.login = (req , res , next) => {
    // Data
    const {email , password} = req.body

    if (!email || !password) {
        req.flash("error_msg" , "All the fields need to be complete!")
        res.redirect("/users/login")
    } else {
        passport.authenticate("local" , {
            successRedirect : "/" ,
            failureRedirect : "/users/login",
            successFlash : true,
            failureFlash : true
        })(req , res , next)
    }
}


// LOGOUT
userCtrl.logout = async(req , res) => {
    req.logout()
    req.flash("success_msg" , "You logged out! But still can see news :)")
    res.redirect("/")
}

module.exports = userCtrl