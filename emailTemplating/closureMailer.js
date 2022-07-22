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
                 <p>Regards, 
                 <div dir="ltr" style="mso-line-height-rule:exactly;-webkit-text-size-adjust:100%;direction:ltr;"><table cellpadding="0" cellspacing="0" border="0" style="width:100%;"><tr style="font-size:0;"><td align="left" style="vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0" style="font-size:0;"><tr style="font-size:0;"><td align="left" style="padding:0;vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0" style="font-size:0;"><tr style="font-size:0;"><td align="left" style="vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0" style="width:100%;font-size:0;color:#000001;font-style:normal;font-weight:700;white-space:nowrap;"><tr style="font-size:13.33px;"><td align="left" style="vertical-align:top;font-family:Arial;">Hungry Jack's Master Data<span style="font-family:remialcxesans;font-size:1px;color:#FFFFFF;line-height:1px;">​</span></td></tr><tr style="font-size:13.33px;"><td align="left" style="padding:13px 0 0;vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0" style="font-size:0;color:#000001;font-style:normal;font-weight:400;white-space:nowrap;"><tr style="font-size:10.67px;white-space:normal;"><td align="left" style="padding:0;vertical-align:top;font-family:Arial;">Level 6, 100 William Street<br>Woolloomooloo<br>NSW 2011, </td></tr><tr style="font-size:0;"><td align="left" style="padding:0;vertical-align:middle;"></td></tr><tr style="font-size:0;"><td align="left" style="padding:0;vertical-align:middle;"></td></tr><tr style="font-size:10.67px;"><td align="left" style="padding:0;vertical-align:middle;font-family:Arial;"><a href="mailto:masterdata@hungryjacks.com.au" target="_blank" id="LPlnk689713" style="text-decoration:none;color:#000001;"><strong style="font-weight:400;">hjmasterdata@hungryjacks.com.au</strong></a></td></tr><tr style="font-size:10.67px;"><td align="left" style="padding:0;vertical-align:top;font-family:Arial;"><br></td></tr></table></td></tr></table></td></tr></table></div>
             </div>
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