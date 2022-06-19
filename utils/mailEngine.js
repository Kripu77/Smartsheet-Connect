const nodemailer = require("nodemailer");

//nodemailer instance
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//main mail fn
function callMailengine(dateCalc, csv, menulog, deliveroo, uber, storeChecker ){
  var mailOptions = {
    from: process.env.EMAIL,
    to: "kripu.khadka@hungryjacks.com.au",
    subject: `Trading Hour Changes for ${dateCalc}`,
    html: ` <p>Please find the Trading Hours Changes required in the attached file. </br> ${storeChecker.length>0? `${storeChecker.length}`: "no"} new request has been received for Hours Change via Smartsheet portal.</p>
    
 
    </br> 
   
    <p>Regards, 
    </br>
    <center> <img src="https://www.hungryjacks.com.au/App_Themes/HJ/assets/images/HJLogo.svg"/>
    </center>
  
    </p>
    `,
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