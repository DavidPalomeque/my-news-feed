const router = require("express").Router()
const productCtrl = require("../controllers/productController")
const {ensureAuthenticated} = require("../config/auth")

router.get("/products" , productCtrl.getAllProducts)
router.post("/products/sorting/category&price" , productCtrl.getAllProductsBySorting)
router.get("/products/showOne/:_id" , productCtrl.showOneProductById)
router.post("/products/addToShopcart/:user_id&:product_id" , ensureAuthenticated , productCtrl.addProductToShopcart)

module.exports = router