const mongoose = require("mongoose")
const {Schema} = mongoose

const BoughtProduct = new Schema({
    name : String ,
    category : String ,
    price : Number ,
    boughtQuantity : Number ,
    imageURL: String ,
    public_id: String ,
    product_id : String ,
    user_id : String ,
    date : {type : Date , default : Date.now()}
    
})

module.exports = mongoose.model("BoughtProduct" , BoughtProduct)