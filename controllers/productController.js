const productCtrl = {}
const Product = require("../models/productModel")
const User = require("../models/userModel")
const BoughtProduct = require("../models/boughtProductModel")

// GET ALL PRODUCTS
productCtrl.getAllProducts = async(req , res) => {
    const products = await Product.find()
    if (!products) {
        res.render("products/productsPage")
    } else {
        res.render("products/productsPage" , {products})
    }

}

// GET ALL PRODUCTS BY SORTING (category , price)
productCtrl.getAllProductsBySorting = async (req, res) => {
    //Data
    const { category, price } = req.body

    //Validations
    if (!category || !price) { // checking if there is category and price
        req.flash("error_msg", "Some data is missing !")
        res.redirect("/products")
    } else { // checking if the category and the price exist
            const categoryExists = await Product.find({ category: category })
            if (!categoryExists || (price !== "all" && price !== "high" && price !== "low")) {
                req.flash("error_msg", "Something went wrong with the sent data !")
                res.redirect("/products")
            } else { // displaying the products according to the sent category and price

                // getting category´s products
                var categoryProducts = await Product.find({ category: category })
                if (category == "all") categoryProducts = await Product.find()

                // ordering category´s products by price and displaying them
                if (price == "all") { // without specific order
                    const products = categoryProducts
                    res.render("products/productsPage", { products })
                }
                if (price == "high") { // from highest to lowest
                    const products = await categoryProducts.sort( (a , b) => { // ordering function
                        if (a.price < b.price) return 1
                        if (a.price > b.price) return -1
                        return 0
                    })
                    res.render("products/productsPage", { products })
                }
                if (price == "low") { // from lowest to highest
                    const products = await categoryProducts.sort( (a , b) => {
                        if (a.price > b.price) return 1
                        if (a.price < b.price) return -1
                        return 0
                    })
                    res.render("products/productsPage", { products })
                }
            }
        }
}

// SHOW ONE PRODUCT BY ID
productCtrl.showOneProductById = async(req , res) => {
    const {_id} = req.params

    const product = await Product.findById(_id)
    if (!product) {
        req.flash("error_msg" , "Sorry , that product doesn´t exist.")
        res.redirect("/products")
    } else {
        res.render("products/oneProductPage" , { product })
    }
}

// ADD PRODUCT TO SHOPCART (user_id , product_id , quantity)
productCtrl.addProductToShopcart = async(req , res) => {
    // Data
    const userId = req.params.user_id
    const productId = req.params.product_id
    var quantity = req.body.quantity
    
    // Find user & product
    const user = await User.findById(userId)
    const product = await Product.findById(productId)

    // Modify default quantity
    if (quantity == "" || null) quantity = 1

    // Validations
    if (!user || !product || !userId || !productId) { // if something is missing
        req.flash("error_msg" , "This action can´t be done")
        res.redirect("/products")
    } else {
            if (quantity <= 0) { // if quantity is not valid
                req.flash("error_msg" , "You can´t buy 0 or less products !")
                res.redirect("/products/showOne" + productId)
            } else {
                if (product.stock - quantity < 0) { // if the stock is not enough
                    req.flash("error_msg" , "You can´t buy that quantity because surpass the stock.")
                    res.redirect("/products/showOne/" + productId)
                } else { // add product to the shopcart
                    
                        const newBoughtProduct = new BoughtProduct({ // create new BoughtProduct & add the info
                            name : product.name ,
                            category : product.category ,
                            price : product.price ,
                            boughtQuantity : quantity ,
                            imageURL : product.imageURL ,
                            public_id : product.public_id ,
                            product_id : product._id ,
                            user_id : user._id ,
                        })
                        product.stock = product.stock - quantity // update the product stock
                        await user.shopcart.push(newBoughtProduct) // add the product to the user´s shopcart
                        await product.save() // save updated product
                        await user.save() // save updated user´s shopcart
                        await newBoughtProduct.save() // save the new BoughtProduct
                        .then(done => { // Ok
                            req.flash("success_msg" , "Product added !")
                            res.redirect("/products")
                            console.log("New Product added successfully.");
                            
                        })
                        .catch(err => { // error
                            req.flash("error_msg" , "Sorry , there was an error !")
                            res.redirect("/products")
                            console.log(err);
                        })

                    }
                }
            }
}

module.exports = productCtrl