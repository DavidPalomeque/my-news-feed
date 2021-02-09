const router = require("express").Router()
const landingPageCtrl = require("../controllers/landingPageController")
const express = require("express")
const app = express()
const https = require('https');
http = require('http')
const request = require("request")

router.get("/" , (req , res) => {
    request(`https://newsapi.org/v2/everything?q=tesla&from=2021-01-09&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
    res.render("landingpage/landingpage")
})

router.post("/contactForm" , landingPageCtrl.contactForm)

module.exports = router