const landingPageCtrl = {}
const request = require("request")
const nodemailer = require("nodemailer")
const date = require('date-and-time');


landingPageCtrl.getNews = async (req, res) => {
  let url;
  let data = req.body;

  // get
  if (Object.keys(data).length === 0) {
    url = `https://newsapi.org/v2/everything?qInTitle=bitcoin&apiKey=${process.env.NEWS_API_KEY}`
  }

  // post
  if (Object.keys(data).length > 0) {
    var dates = transformDate(data.date)
    data.from = dates.from
    data.to = dates.to
    
    if (data.endpoint == 'everything') {
      url = `https://newsapi.org/v2/${data.endpoint}?qInTitle=${data.keyword}&language=${data.language}&from=${data.from}&to=${data.to}&sortBy=${data.sortBy}&apiKey=${process.env.NEWS_API_KEY}`
    }
    if (data.endpoint == 'top-headlines') {
      url = `https://newsapi.org/v2/${data.endpoint}?qInTitle=${data.keyword}&language=${data.language}&apiKey=${process.env.NEWS_API_KEY}`
    }
  }

  // news api request
  request(url, function (error, response, body) {
        //console.error('error:', error); // error
        //console.log('statusCode:', response && response.statusCode); // status
        //console.log('body:', body); // body
        var newsJson = JSON.parse(body);
        var news = newsJson.articles
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


function transformDate(textDate) {
  var dates = {}

  switch (textDate) {
    case 'today':
      dates.from = date.format(new Date(), 'YYYY/MM/DD');
      dates.to = date.format(new Date(), 'YYYY/MM/DD');
      break;

    case 'yesterday':
      dates.from = date.format(date.addDays(new Date(), -1), 'YYYY/MM/DD');
      dates.to = date.format(date.addDays(new Date(), -1), 'YYYY/MM/DD');
      break;
    
    case 'lastWeek':
      dates.from = date.format(date.addDays(new Date(), -7), 'YYYY/MM/DD');
      dates.to = date.format(new Date(), 'YYYY/MM/DD');
      break;

    case 'lastMonth':
      dates.from = date.format(date.addDays(new Date(), -28), 'YYYY/MM/DD'); // maybe 31?
      dates.to = date.format(new Date(), 'YYYY/MM/DD');
      break;
  
    default:
      break;
  }

  return dates;
}

module.exports = landingPageCtrl