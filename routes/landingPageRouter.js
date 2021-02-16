const router = require("express").Router()
const landingPageCtrl = require("../controllers/landingPageController")

router.get("/" , landingPageCtrl.getNews)
router.post("/" , landingPageCtrl.getNews)
router.post("/contactForm" , landingPageCtrl.contactForm)

module.exports = router