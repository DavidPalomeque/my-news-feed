const router = require("express").Router()
const shopcartCtrl = require("../controllers/shopcartController")
const {ensureAuthenticated} = require("../config/auth")

router.get("/shopcart/:user_id" , ensureAuthenticated , shopcartCtrl.showShopcart)
router.get("/shopcart/deleteProduct/:shopcartProduct_id" , ensureAuthenticated , shopcartCtrl.deleteShopcartProduct)
router.get("/shopcart/clean/:user_id" , ensureAuthenticated , shopcartCtrl.cleanShopcart)
router.get("/shopcart/buy/:user_id" , ensureAuthenticated , shopcartCtrl.buyShopcart)

module.exports = router