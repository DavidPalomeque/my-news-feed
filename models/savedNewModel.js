const mongoose = require("mongoose")
const {Schema} = mongoose

const SavedNew = new Schema({
    source : String ,
    author: String,
    title : String ,
    url : String ,
    urlToImage : String ,
    publishedAt: String ,
    content: String ,
    user_id : String ,
    date : {type : Date , default : Date.now()}
    
})

module.exports = mongoose.model("SavedNew" , SavedNew)