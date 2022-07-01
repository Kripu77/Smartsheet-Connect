let nodemailer = require("nodemailer");


//nodemailer instance
// var transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "30fe70e2a0ba27",
//     pass: "71c049a8f93af1"
//   }
// });

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



//main mail fn
function callMailengine(dateCalc, csv, menulog, deliveroo, uber, storeChecker, cleansedSheet ){
  var mailOptions = {
    from: process.env.EMAIL,
    to: "kripu.khadka@hungryjacks.com.au",
    cc: "kripu.khadka@hungryjacks.com.au",
    subject: `Trading Hour Changes ${dateCalc}`,
    html: 
    ` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div>
            <p>Hi Team,
            </br>
            </br>
             Please find the Trading Hours Changes required in the attached file. </br> ${storeChecker.length>0? `${storeChecker.length}`: "no"} new request has been received for Hours Change via Smartsheet portal.</p>
            <p>Regards, 
            </br>
          </p>
         HJ Master Data
        </div>
        
    </body>
    </html>
    `,
    attachments: [
      {
        filename: `Trading hours ${dateCalc}.csv`,
        content: csv,
      },
      {
        filename: `Prepped Trading hours ${dateCalc}.csv`,
        content: cleansedSheet,
      },
      {
        filename: `Trading hours Update ${dateCalc} ML.csv`,
        content: menulog,
      },
      {
        filename: `Deliveroo Trading hours Update ${dateCalc}.csv`,
        content: deliveroo,
      },
      {
        filename: `Trading hours Update ${dateCalc.replaceAll("-", ".")}.csv`,
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