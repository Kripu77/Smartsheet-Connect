let nodemailer = require("nodemailer");



//nodemailer instance

var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3',
       
    },
    auth: {
      user: process.env.EMAIL,
          pass: process.env.PASSWORD
    }
  });
  



  module.exports ={
    transporter
  }