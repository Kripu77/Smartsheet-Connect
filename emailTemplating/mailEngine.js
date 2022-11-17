const { transporter } = require("./configs");

//main mail fn
function callMailengine(
  dateCalc,
  csv,
  menulog,
  uber,
  googleFile,
  storeChecker,
  cleansedSheet
) {
  var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.MASTER_CC,
    cc: "kripu.khadka@hungryjacks.com.au",
    subject: `Trading Hour Changes ${dateCalc}`,
    html: ` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trading Hours</title>
    </head>
    <body>
        <div>
            <p>Hi Team,
            </br>
            </br>
             Please find the Trading Hours Changes required in the attached file. </br> ${
               storeChecker.length > 0 ? `${storeChecker.length}` : "no"
             } new request has been received for The Trading Hours update via the Smartsheet portal.</p>
            <p>Regards, 
            <div dir="ltr" style="mso-line-height-rule:exactly;-webkit-text-size-adjust:100%;direction:ltr;"><table cellpadding="0" cellspacing="0" border="0" style="width:100%;"><tr style="font-size:0;"><td align="left" style="vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0" style="font-size:0;"><tr style="font-size:0;"><td align="left" style="padding:0;vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0" style="font-size:0;"><tr style="font-size:0;"><td align="left" style="vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0" style="width:100%;font-size:0;color:#000001;font-style:normal;font-weight:700;white-space:nowrap;"><tr style="font-size:13.33px;"><td align="left" style="vertical-align:top;font-family:Arial;">Hungry Jack's Master Data<span style="font-family:remialcxesans;font-size:1px;color:#FFFFFF;line-height:1px;">​</span></td></tr><tr style="font-size:13.33px;"><td align="left" style="padding:13px 0 0;vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0" style="font-size:0;color:#000001;font-style:normal;font-weight:400;white-space:nowrap;"><tr style="font-size:10.67px;white-space:normal;"><td align="left" style="padding:0;vertical-align:top;font-family:Arial;">Level 6, 100 William Street<br>Woolloomooloo<br>NSW 2011, </td></tr><tr style="font-size:0;"><td align="left" style="padding:0;vertical-align:middle;"></td></tr><tr style="font-size:0;"><td align="left" style="padding:0;vertical-align:middle;"></td></tr><tr style="font-size:10.67px;"><td align="left" style="padding:0;vertical-align:middle;font-family:Arial;"><a href="mailto:masterdata@hungryjacks.com.au" target="_blank" id="LPlnk689713" style="text-decoration:none;color:#000001;"><strong style="font-weight:400;">hjmasterdata@hungryjacks.com.au</strong></a></td></tr><tr style="font-size:10.67px;"><td align="left" style="padding:0;vertical-align:top;font-family:Arial;"><br></td></tr></table></td></tr></table></td></tr></table></div>
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
        filename: `Oracle Trading hours Update ${dateCalc}.csv`,
        content: cleansedSheet,
      },
      {
        filename: `Trading hours Update ${dateCalc} ML.csv`,
        content: menulog,
      },
      {
        filename: `Trading hours Update UberEats ${dateCalc.replaceAll("-", ".")}.csv`,
        content: uber,
      },
      {
        filename: `Google Upload hours Update ${dateCalc}.csv`,
        content: googleFile,
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

module.exports = { callMailengine };
