const landingPageCtrl = {}
const nodemailer = require("nodemailer")

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