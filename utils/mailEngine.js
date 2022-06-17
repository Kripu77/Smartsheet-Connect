const nodemailer = require("nodemailer");

//nodemailer instance
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

function callMailengine(dateCalc, csv, menulog, deliveroo, uber ){
  var mailOptions = {
    from: process.env.EMAIL,
    to: "kripu.khadka@hungryjacks.com.au",
    subject: `Trading Hour Changes for ${dateCalc}`,
    text: "Please find the Trading Hours Changes required in the attached file!",
    attachments: [
      {
        filename: `Trading hours ${dateCalc}.csv`,
        content: csv,
      },
      {
        filename: `Menulog Trading hours Update ${dateCalc}.csv`,
        content: menulog,
      },
      {
        filename: `Deliveroo Trading hours Update ${dateCalc}.csv`,
        content: deliveroo,
      },
      {
        filename: `Uber Trading hours Update ${dateCalc}.csv`,
        content: uber,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}


module.exports={callMailengine}