var client = require("smartsheet");
var cron = require("node-cron");
var nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();
const{menulogWriter}= require("./DeliveryPartnerTemplatingEngine/menulog");
const{deliverooWriter} =require("./DeliveryPartnerTemplatingEngine/deliveroo")


//smartsheet instance
var smartsheet = client.createClient({
  accessToken: process.env.ACCESS_TOKEN,
});

//node mailer instace

//row and column data
var columnHeader = [];
var neededData = [];
var checkerData = [];
let mergedML;
const options = {
  id: 126087943481220,
};

const { dateCalc, tommorowDateCal, yesterDayDateCal } = require("./utils/dateCalculator.js");


// console.log(dateCalc);

// //cron will execute task every minute
// cron.schedule("0 23 * * *", () => {
  

smartsheet.sheets.getSheet(options).then((sheetInfo) => {
  //   console.log(sheetInfo.rows)

  const newSheet = Array.from(sheetInfo.rows);
  const columnData = Array.from(sheetInfo.columns); //for default column header

  const fullColumnData = columnData.map((data) => {
    const { title } = data;

    return title;
  }); //extracts the title
  columnHeader.push(...fullColumnData);

  const filterd = newSheet.filter((idx) => {
    const { cells, rowNumber } = idx;
    return (
      cells[45].value === dateCalc ||
      cells[45].value === tommorowDateCal ||
      cells[45].value === yesterDayDateCal
    );
  });
  neededData.push(...filterd);

  const data = neededData.map((datax) => {
    const { cells } = datax;
    // console.log(cells)
    const storeData = [...cells];
    return storeData;
  });

 

  //merge all tha two-dimensional array obtained from the fn.
//   const newxxx = ["3451", "3444", "3481", "8470"];
//   const collectionType = "storeInfo"
//   const deliverooquery = test(collectionType, newxxx )
//   console.log(deliverooquery)
//   const deliverooPre = deliverooWriter(data, deliverooquery)
//   const deliveroo = deliverooHeader.concat(...deliverooPre).toString();
// console.log(deliveroo)

//   menulogWriter(data);
//   const menulogData = menulogWriter(data);


// console.log(test(collectionType, newxxx ))




  const final = data.map((value) => {
    return value[0].displayValue;
  });
  //  console.log(final);
  checkerData.push(...final);

 
  // console.log(checkerData);
});

module.exports = {
checkerData
 
};
