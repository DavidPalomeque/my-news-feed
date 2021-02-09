const LocalStrategy = require("passport-local").Strategy
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({usernameField : "email"} , (email , password , done) => { // email & password will be the taken data
            User.findOne({email : email}) // find by email
            .then(user => {
                if (!user) { // if the email is wrong
                    return done(null , false , {message : "Incorrect Email!"})
                }
                bcrypt.compare(password , user.password , (err , isMatch) => { // compare passwords
                    if(err) throw err // if there is an error

                    if (isMatch) { // if the passwords match
                        return done(null , user)
                    } else {
                        return done(null , false , {message : "Incorrect Password !"})
                    }
                })
            })
            .catch(err => { // if some error happen in the process
                console.log(err);
                return done(null , false , {message : "Some error happened..."})
            })
        })
    )

    passport.serializeUser(function(user , done) { // serialize user
        done(null , user.id)
    })

    passport.deserializeUser(function(id , done) { // deserialize user
        User.findById(id , function(err , user) {
            done(err , user)
        })
    })

}