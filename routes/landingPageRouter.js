const router = require("express").Router()
const landingPageCtrl = require("../controllers/landingPageController")
const savednewsCtrl = require("../controllers/savednewsController")

router.get("/" , landingPageCtrl.getNews)
router.post("/" , landingPageCtrl.getNews)
router.post("/savednews/add", savednewsCtrl.addToList)

module.exports = router