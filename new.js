var client = require("smartsheet");
var cron = require("node-cron");
const nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();
const { parse } = require("json2csv");

//smartsheet instance
var smartsheet = client.createClient({
  accessToken: "9RwrziYobnX1MCLRYQ6w7cbfGGS6cI6knXJq1",
});
//nodemailer instance
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//for row and column
var columnHeader = [];
var neededData = [];
var finalRowData =[];
var compiledData = [];

//smartsheet sheet id
const options = {
  id: 126087943481220,
};

const { dateCalc, tommorowDateCal, yesterDayDateCal } = require("./index.js");
console.log(dateCalc);



//cron will execute task every minute
// cron.schedule("0 18 * * *", () => {
smartsheet.sheets.getSheet(options).then((sheetInfo) => {
  //   console.log(sheetInfo.rows)
  const newSheet = Array.from(sheetInfo.rows);
  const columnData = Array.from(sheetInfo.columns); //for default column header
  const fullColumnData = columnData.map((data) => {
    const { title } = data;

    return title;
  }); //extracts the title
  columnHeader.push(...fullColumnData);
  columnHeader.push("\n")
  // console.log(fullColumnData);

  // console.log(newSheet[43].cells[45])
  const filterd = newSheet.filter((idx) => {
    const { cells, rowNumber } = idx;
    return (
      cells[45].value === dateCalc ||
      cells[45].value === tommorowDateCal ||
      cells[45].value === yesterDayDateCal
    );
  });
  neededData.push(...filterd);
  //  console.log(...filterd)
});

//cell 45 for effective data column id 6956681251841924

// setTimeout(()=>{
//     console.log(columnHeader);
// },4000)

setTimeout(() => {
  neededData.forEach((eachCell) => {
    const { cells } = eachCell;
    cells.map((singleCell) => {
      const { value } = singleCell;
      finalRowData.push(!value ? "" : value.toString().replace(",", " "));
    
    });
       finalRowData.push("\n");
   
  });

 
  compiledData.push(columnHeader);
  compiledData.push(finalRowData);
  const csv = compiledData.toString();
  console.log(csv)

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
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  //for row and column
  columnHeader = [];
  neededData = [];
  finalRowData = [];
 compiledData = [];
}, 15000);
