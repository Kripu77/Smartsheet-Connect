let client = require("smartsheet");
require("dotenv").config();
//for row and column initial state
var neededData = [];
var columnHeader = [];

const {
    dateCalc,
    tommorowDateCal,
    yesterDayDateCal,
  } = require("../utils/dateCalculator.js");


//smartsheet instance
let smartsheet = client.createClient({
    accessToken: process.env.ACCESS_TOKEN,
  });
  

  //smartsheet sheet id
const options = {
    id: process.env.SHEET_ID,
  };

  const smartsheetCaller =()=>{

 

  smartsheet.sheets.getSheet(options).then((sheetInfo) => {
    const newSheet = Array.from(sheetInfo.rows);
    //for default column header
    const columnData = Array.from(sheetInfo.columns);
    //extract all col headers
    const fullColumnData = columnData.map((data) => {
      const { title } = data;
      return title;
    });
    //extracts the title
    columnHeader.push(...fullColumnData);
    columnHeader.push("\n");
  
    const filterd = newSheet.filter((idx) => {
      const { cells } = idx;
      return (
        cells[45].value === dateCalc||
        cells[45].value === tommorowDateCal ||
        cells[45].value === yesterDayDateCal
      );
    });
    neededData.push(...filterd);
  });


}

smartsheetCaller();



module.exports={neededData, columnHeader}