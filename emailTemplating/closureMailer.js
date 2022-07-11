let nodemailer = require("nodemailer");


//nodemailer instance with SMTP provider


var transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
     ciphers:'SSLv3'
  },
  auth: {
    user: process.env.EMAIL,
        pass: process.env.PASSWORD
  }
});


//main mail fn
function callClosureMailengine(dateCalc, main, bodyText, attachmentName, recepeints, recepientsName){
  var mailOptions = {
    from: process.env.EMAIL,
    to: `${recepeints}`,
    cc: "kripu.khadka@hungryjacks.com.au",
    subject: `${attachmentName} ${dateCalc}`,
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
                <p>Hi ${recepientsName},
                </br>
                </br>
                 Please find the ${bodyText}.</p>
                <p>  Regards, 
               
                </br>
                HJ Master Data
              </p>
            
       
         <img src="https://www.hungryjacks.com.au/App_Themes/HJ/assets/images/HJLogo.svg"/>
        </div>
        
    </body>
    </html>
    `,
    attachments: [
      {
        filename: ` ${attachmentName+ " "+ dateCalc}.csv`,
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