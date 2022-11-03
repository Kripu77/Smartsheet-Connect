let client = require("smartsheet");
require("dotenv").config();

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

//data fetcher fn

const smartsheetCaller = async () => {
  try {
    //for row and column initial state
    var columnHeader = [];

    var rowData = [];

    let data = await smartsheet.sheets.getSheet(options);
    let rows = await Array.from(data.rows);
    let columnData = await Array.from(data.columns);

    // extract all col headers
    const fullColumnData = columnData.map((data) => {
      const { title } = data;
      return title;
    });

    columnHeader.push(...fullColumnData);
    columnHeader.push("\n");

    //filter data based on the date logic
    const filterd = rows.filter((idx) => {
      const { cells } = idx;
      return (
        cells[46].value === "2022-10-30"
      );
    });

    rowData.push(...filterd);

    return { columnHeader: columnHeader, rowData: rowData };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  smartsheetCaller,
};
