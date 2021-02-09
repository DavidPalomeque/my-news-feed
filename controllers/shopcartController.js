const shopcartCtrl = {}
const mongoose = require("mongoose")
const User = require("../models/userModel")
const BoughtProduct = require("../models/boughtProductModel")

// Show shopcart
shopcartCtrl.showShopcart = async (req , res) => {
    const userId = req.params.user_id // Data
    const user = await User.findById(userId) // Find user

    // Validations
    if (!userId || !user) { // if some data is missing
        req.flash("error_msg" , "This action can´t be done !")
        res.redirect("/products")
    } else {
        const shopcart = user.shopcart // take user shopcart data
        var total = {value : Number}
        total.value = 0

        for (let i = 0; i < shopcart.length; i++) {
            const shopcartProduct = shopcart[i]
            var totalProduct = shopcartProduct.price * shopcartProduct.boughtQuantity
            total.value += totalProduct
        }

        if (shopcart) { // ok
            res.render("shopcart/shopcart" , {shopcart , total} )
        } else { // something went wrong while taking user shopcart data
            req.flash("error_msg" , "Sorry , some error happened.")
            res.redirect("/products")
        }
    }
}

// Delete product of shopcart
shopcartCtrl.deleteShopcartProduct = async (req , res) => {
    const shopcartProductId = req.params.shopcartProduct_id // Take data
    const shopcartProduct = await BoughtProduct.findById(shopcartProductId) // Find BoughtProduct
    const user = await User.findById(shopcartProduct.user_id) // Find user that bought the Product
    
    if (!shopcartProductId || !shopcartProduct || !user) { // If some data is missing
        req.flash("error_msg" , "This action can´t be done")
        res.redirect("/products")
    } else {
        var shopcart = user.shopcart // shopcart is equal to the user´s shopcart array
        var done = false // helper variable
        for (let i = 0; i < shopcart.length; i++) { // if some product of the user´s shopcart has the same id that the sent id
            if (shopcart[i]._id == shopcartProductId) { // delete the product from the user´s shopcart & the BoughtProduct collection
                shopcart.splice(i , 1) , await user.save() , await BoughtProduct.deleteOne() , done = true
            }
        }
        if (done) req.flash("success_msg" , "Product Removed !") , res.redirect("/shopcart/" + user._id) // Ok
        else req.flash("error_msg" , "Sorry , some error happened...") , res.redirect("/products") // Id didn´t match
    }

}

// Clean shopcart
shopcartCtrl.cleanShopcart = async(req , res) => {
    const _id = req.params.user_id // Take data
    const user = await User.findById(_id) // Find user

    if (!_id || !user) { // If some data is missing
        req.flash("error_msg" , "This action can´t be done !")
        res.redirect("/products")
    } else {
        var shopcart = user.shopcart // Taking user´s shopcart
        await shopcart.forEach(async product => { // Find each product of the shopcart & remove it of BoughtProduct collection
            var shopcartProductId = product._id
            var boughtProductRemoved = await BoughtProduct.findByIdAndDelete(shopcartProductId)
            if (boughtProductRemoved) console.log("Removed");
            else console.log("Not removed");
        });
        shopcart = [] // Clean shopcart
        user.shopcart = shopcart // Clean user´s shopcart
        await user.save() // Save updated user´s shopcart
        .then(done => { // Ok
            console.log("done");
            req.flash("success_msg" , "The shopcart was cleaned")
            res.redirect("/shopcart/" + user._id)
        })
        .catch(err => { // Error
            console.log(err);
            req.flash("error_msg" , "Sorry , some error happened...")
            res.redirect("/products")
        })
    }

}

// Buy shopcart
shopcartCtrl.buyShopcart = async(req , res) => {
    const userId = req.params.user_id // Take data
    const user = await User.findById(userId) // Find user

    if (!userId || !user) { // If some data is missing
        req.flash("error_msg" , "This action can´t be done")
        res.redirect("/products")
    } else {
        var shopcart = user.shopcart // take user shopcart data
        var total = 0 // Total shopcart value
        
        shopcart.forEach(async shopcartProduct => {
            // Calculate total shopcart value
            var totalProduct = shopcartProduct.price * shopcartProduct.boughtQuantity
            total += totalProduct
            // Find each product of the shopcart in BoughtProduct collection & remove it
            var shopcartProductId = shopcartProduct._id
            var boughtProductRemoved = await BoughtProduct.findByIdAndDelete(shopcartProductId)
        });

        shopcart = []
        user.shopcart = shopcart
        await user.save()
        .then(done => {
            req.flash("success_msg" , "You bought the shopcart for $" + total)
            res.redirect("/shopcart/" + userId)
        })
        .catch(err => {
            console.log(err);
            req.flash("error_msg" , "Sorry , some error happened")
            res.redirect("/products")
        })
    }

}


module.exports = shopcartCtrl