const nodemailer = require("nodemailer");
require("dotenv").config();

//nodemailer instance
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//main mail fn
function callClosureMailengine(dateCalc, main){
  var mailOptions = {
    from: process.env.EMAIL,
    to: "kripu.khadka@hungryjacks.com.au",
    subject: `Trading Hour Changes for ${dateCalc}`,
    html: 
    ` <p>Hi Team,
    </br>
    </br>
     Please find the Store Closure Request Received in the attached file via Smartsheet portal.</p>
    <p>Regards, 
    </br>
  </p>
 <img src="https://www.hungryjacks.com.au/App_Themes/HJ/assets/images/HJLogo.svg"/>
    `,
    attachments: [
      {
        filename: `Temproary Closure Hours ${dateCalc}.csv`,
        content: main,
      }
     
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


module.exports={callClosureMailengine}