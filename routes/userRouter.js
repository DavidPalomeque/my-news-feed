const router = require("express").Router()
const UserCtrl = require("../controllers/userController")
const {ensureAuthenticated} = require("../config/auth")

router.get("/users/signup" , (req , res) => { 
    res.render("signuplogin/signup")
})
router.post("/users/signup" , UserCtrl.signup)

router.get("/users/login" , (req , res) => {
     res.render("signuplogin/login")
})
router.post("/users/login" , UserCtrl.login)
router.get("/users/logout" , ensureAuthenticated , UserCtrl.logout)

module.exports = router