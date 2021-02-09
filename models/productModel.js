const mongoose = require("mongoose")
const {Schema} = mongoose


const Product = new Schema({
    name : String ,
    description : String ,
    category : String ,
    price : Number ,
    stock : Number ,
    imageURL: String ,
    public_id: String ,
    date : {type : Date , default : Date.now()}
})


module.exports = mongoose.model("Product" , Product)