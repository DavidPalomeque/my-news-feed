const savednewsCtrl = {}
const mongoose = require("mongoose")
const User = require("../models/userModel")
const SavedNew = require("../models/savedNewModel")

// Show shopcart
savednewsCtrl.showList = async (req , res) => {
    const userId = req.params.user_id
}

savednewsCtrl.addToList = async (req , res) => {
    const userId = req.params.user_id
}

// Delete product of shopcart
savednewsCtrl.deleteFromList = async (req , res) => {
    const shopcartProductId = req.params.shopcartProduct_id // Take data
}

// Clean shopcart
// savednewsCtrl.cleanShopcart = async(req , res) => {}


module.exports = savednewsCtrl