const router = require("express").Router()
const savednewsCtrl = require("../controllers/savednewsController")
const {ensureAuthenticated} = require("../config/auth")

router.get("/savednews/:user_id" , ensureAuthenticated , savednewsCtrl.showList)
router.post("/savednews/add" , ensureAuthenticated , savednewsCtrl.addToList)
router.get("/savednews/delete/:savednew_id" , ensureAuthenticated , savednewsCtrl.deleteFromList)
// router.get("/shopcart/clean/:user_id" , ensureAuthenticated , shopcartCtrl.cleanShopcart)

module.exports = router