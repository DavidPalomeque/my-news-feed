const LocalStrategy = require("passport-local").Strategy
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({usernameField : "email"} , (email , password , done) => {
            User.findOne({email : email})

            .then(user => {
                // if email is wrong
                if (!user) {
                    return done(null , false , {message:"Incorrect Email!"})
                }
                // compare passwords
                bcrypt.compare(password , user.password , (err , isMatch) => {
                    if(err) throw err
                    // check password
                    if (isMatch) {
                        return done(null , user)
                    } else {
                        return done(null , false , {message:"Incorrect Password!"})
                    }
                })
            })

            // if some error happen in the process
            .catch(err => {
                console.log(err);
                return done(null , false , {message : "Some error happened..."})
            })
        })
    )

    // serialize user
    passport.serializeUser(function(user , done) {
        done(null , user.id)
    })

    // deserialize user
    passport.deserializeUser(function(id , done) {
        User.findById(id , function(err , user) {
            done(err , user)
        })
    })

}