var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kripu.12345@gmail.com",
    pass: "wovxoassvxewvhky",
  },
});
const csv = ["hello", "apple", "cat"]
var mailOptions = {
  from: "kripu.12345@gmail.com",
  to: "kripu.khadka@hungryjacks.com.au",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
  attachments: [
    {
      filename: "trading hours.csv",
      content: csv,
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

