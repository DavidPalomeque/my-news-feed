const landingPageCtrl = {}
const request = require("request")
const nodemailer = require("nodemailer")


landingPageCtrl.getNews = async (req, res) => {
  // everything; q=tesla; from=2021-01-15; to=2021-02-10; sortBy=popularity; sortBy=publishedAt;
  // top-headlines; q=tesla; country=us;
  request(`https://newsapi.org/v2/everything?q=campazzo&from=2021-01-15&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`, function (error, response, body) {
        //console.error('error:', error); // error
        //console.log('statusCode:', response && response.statusCode); // status
        //console.log('body:', body); // body
        var newsJson = JSON.parse(body);
        var news = newsJson.articles
        // console.log(news); // json body
        res.render("landingpage/landingpage", {news})
  });
}



landingPageCtrl.contactForm = async (req, res) => {
  const { name, email, content } = req.body // Take data

  if (!name || !email || !content) { // If some data is missing
    req.flash("error_msg", "All the fields have to be complete for send the message !")
    res.redirect("/")
  } else { // Send Email

    var transporter = nodemailer.createTransport({ // create transporter
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
      }
    })

    var mailOptions = { // Message data
      from: name,
      to: process.env.NODEMAILER_EMAIL,
      subject: "Contact with the programmer form",
      text: `name: ${name} \n email: ${email} \n message: ${content} `
    };

    transporter.sendMail(mailOptions, function (error, info) { // Send email
      if (error) {
        console.log(error);
        req.flash("error_msg" , "Sorry , some error happened.")
        res.redirect("/")
      } else {
        console.log('Email sent: ' + info.response)
        req.flash("success_msg" , "Email was sent successfully !")
        res.redirect("/")
      }
    });
    
  }

}

module.exports = landingPageCtrl