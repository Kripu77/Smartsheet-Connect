let nodemailer = require("nodemailer");


//nodemailer instance with SMTP provider
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//main mail fn
function callClosureMailengine(dateCalc, main, bodyText, attachmentName, recepeints, recepientsName){
  var mailOptions = {
    from: process.env.EMAIL,
    to: `${recepeints}`,
    subject: `${attachmentName} ${dateCalc}`,
    html: 
    ` <p>Hi ${recepientsName},
    </br>
    </br>
     Please find the ${bodyText}.</p>
    <p>Regards, 
    </br>
  </p>
 <img src="https://www.hungryjacks.com.au/App_Themes/HJ/assets/images/HJLogo.svg"/>
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