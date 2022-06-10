var client = require("smartsheet");
var cron = require("node-cron");
var nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();
const exceljs = require('exceljs');




//smartsheet instance
var smartsheet = client.createClient({
  accessToken: process.env.ACCESS_TOKEN,
});

//node mailer instace

//row and column data
var columnHeader = [];
var neededData = [];
const options = {
  id: 126087943481220,
};

const { dateCalc, tommorowDateCal, yesterDayDateCal } = require("./index.js");
console.log(dateCalc);

// async function dataFetcher(options){
// const newData = await smartsheet.sheets.getSheet(options);

//  // console.log(newSheet[43].cells[45])
//  console.log(newData)
// //  const filterd = newSheet.filter((idx) => {
// //    const { cells, rowNumber } = idx;
// //    return (
// //      cells[45].value === dateCalc ||
// //      cells[45].value === tommorowDateCal ||
// //      cells[45].value === yesterDayDateCal
// //    );
// //  });
// //  neededData.push(...filterd);
// }
// dataFetcher();
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
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Trading Hours");
    console.log(neededData.length);
    console.log(columnHeader)
   worksheet.columns = [ 
     {header:"id", key:`${columnHeader.map((data)=>{

      return data
     })}`}
   ];
     
   worksheet.addRows([
     [ neededData.forEach((singleStore) => {
      return singleStore;})]
   ])
      
      async function test() {
        await workbook.xlsx.writeFile("exceljs.xlsx");
      }
      test();
   
    neededData.forEach((singleStore) => {
      const { cells } = singleStore;
      //console.log(cells);
// 

    //   fs.writeFile(
    //     "trading hours.csv",
    //     `${cells.map((cell) => {
    //       return !cell.value
    //         ? " "
    //         : `${cell.value.toString().replace(",", " ")}`;
    //     })}\n`,
    //     { flag: "a" },
    //     (err, res) => {
    //       if (err) throw err;
    //     }
    //   );
     });
    neededData = [];
    columnHeader=[];
  }, 15000);
// });