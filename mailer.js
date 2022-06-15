var client = require("smartsheet");
var cron = require("node-cron");
const nodemailer = require("nodemailer");
const { dateCalc, tommorowDateCal, yesterDayDateCal } = require("./utils/dateCalculator.js");
require("dotenv").config();
const{menulogWriter, mlHeader} = require("./DeliveryPartnerTemplatingEngine/menulog.js");
const {deliverooHeader, deliverooWriter} = require("./DeliveryPartnerTemplatingEngine/deliveroo.js");
const {uberHeader, uberWriter}= require("./DeliveryPartnerTemplatingEngine/uber.js")

//smartsheet instance
var smartsheet = client.createClient({
  accessToken: process.env.ACCESS_TOKEN,
});
//nodemailer instance
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//for row and column initial state
var columnHeader = [];
var neededData = [];
var finalRowData =[];
var compiledData = [];

//smartsheet sheet id
const options = {
  id: 126087943481220,
};






//cron will execute as per the hour we set
cron.schedule("0 19 * * *", () => {
smartsheet.sheets.getSheet(options).then((sheetInfo) => {
  //   console.log(sheetInfo.rows)
  const newSheet = Array.from(sheetInfo.rows);
  const columnData = Array.from(sheetInfo.columns); //for default column header
  const fullColumnData = columnData.map((data) => {
    const { title } = data;

    return title;
  });
   //extracts the title
  columnHeader.push(...fullColumnData);
  columnHeader.push("\n")

  const filterd = newSheet.filter((idx) => {
    const { cells, rowNumber } = idx;
    return (
      cells[45].value === dateCalc ||
      cells[45].value === tommorowDateCal ||
      cells[45].value === yesterDayDateCal
    );
  });
  neededData.push(...filterd);
 
});



setTimeout(() => {
  //for regular extraction
  neededData.forEach((eachCell) => {
    const { cells } = eachCell;
    cells.map((singleCell) => {
      const { value, displayValue } = singleCell;
      finalRowData.push(!value ? "" :  displayValue ? `"${displayValue.toString()}"` : `"${value.toString()}"`  );
    
    });
       finalRowData.push("\n");
   
  });

   //complied state for normal hours file
   compiledData.push(columnHeader);
   compiledData.push(finalRowData);

  //for Delivery Aggs Cleansing
  const data = neededData.map((datax) => {
    const { cells } = datax;
    // console.log(cells)
    const storeData = [...cells];
    return storeData;
  });




  //ml compiled
const menulog = mlHeader
  .concat(...menulogWriter(data))
  .toString()
  
 
  //deliveroo complied

  const deliveroo = deliverooHeader.concat(...deliverooWriter(data)).toString();

  //uber compiled

  const uber = uberHeader.concat(...uberWriter(data)).toString();


  const csv = compiledData.toString();
  // console.log(csv)

  var mailOptions = {
    from: "kripu.12345@gmail.com",
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
  //for row and column clear existing state
  columnHeader = [];
  neededData = [];
  finalRowData = [];
 compiledData = [];
}, 15000);
 })
