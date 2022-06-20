var client = require("smartsheet");
require("dotenv").config();
const {
  dateCalc,
  tommorowDateCal,
  yesterDayDateCal,
} = require("./utils/dateCalculator.js");
const { arrayJoine } = require("./utils/arrayJoin.js");
const {sheetHeader, sheetPrep} =require('./DeliveryPartnerTemplatingEngine/cleanSheet.js')
const {
  menulogWriter,
  mlHeader,
} = require("./DeliveryPartnerTemplatingEngine/menulog.js");
const {
  deliverooHeader,
  deliverooWriter,
} = require("./DeliveryPartnerTemplatingEngine/deliveroo.js");
const {
  uberHeader,
  uberWriter,
} = require("./DeliveryPartnerTemplatingEngine/uber.js");
const { callMailengine } = require("./utils/mailEngine");
const { dbconnect } = require("./mongoConnection/newcon");

//smartsheet instance
var smartsheet = client.createClient({
  accessToken: process.env.ACCESS_TOKEN,
});

//for row and column initial state
var columnHeader = [];
var neededData = [];
var finalRowData = [];
var compiledData = [];
var storeChecker = [];
var tempClosure = [];

//smartsheet sheet id
const options = {
  id: process.env.SHEET_ID,
};

//cron will execute as per the hour we set
// cron.schedule("0 20 * * *", () => {
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
      cells[45].value === dateCalc ||
      cells[45].value === tommorowDateCal ||
      cells[45].value === yesterDayDateCal
    );
  });
  neededData.push(...filterd);
});

setTimeout(() => {
  //for regular extraction
  const storeDataArray = neededData.map((eachCell) => {
    const { cells } = eachCell;
    // console.log(cells)

    finalRowData = cells.map((singleCell) => {
      const { value, displayValue } = singleCell;
      return !value
        ? ""
        : displayValue
        ? `"${displayValue.toString()}"`
        : `"${value.toString()}"`;
    });
    finalRowData.push("\n");

    return finalRowData;
  });

  //complied state for normal hours file
  compiledData.push(columnHeader);
  compiledData.push(...storeDataArray);



  //for Delivery Aggs Cleansing
  const data = neededData.map((datax) => {
    const { cells } = datax;
    const storeData = [...cells];
    return storeData;
  });

  //store num extractor
  function dynamicExtractor(data, lookUpValue) {
    return data.map((value) => {
      if (lookUpValue === "storeChecker") {
        return value[0].displayValue;
      }

      //below to check store closure
      //  if (value[9].hasOwnProperty("value")) {
      //   console.log("im running")
      //   return value;
      // }
    });
  }
  //  const final = data.map((value) => {
  //    return value[0].displayValue;
  //  });
  storeChecker.push(...dynamicExtractor(data, `storeChecker`));

  //  tempClosure.push(
  //    ...dynamicExtractor(data, "Temporary Closure Activation").filter(
  //      (stores) => {
  //        return stores !== undefined;
  //      }
  //    )
  //  );

  let deliverooPre = [];
  let mlPre = [];
  let uberPre = [];

  //delivero conn
  dbconnect("deliverooID", storeChecker).then((deliverooTest) => {
    const deliverooPrex = deliverooWriter(data, deliverooTest);
    deliverooPre.push(...deliverooPrex);
  });

  //uber conn
  dbconnect("uberID", storeChecker).then((uberStores) => {
    console.log(uberStores);
    const uberPrex = uberWriter(data, uberStores);
    uberPre.push(...uberPrex);
  });

  //ml conn

  dbconnect("storeInfo", storeChecker).then((menulogStores) => {
    console.log(menulogStores);
    const mlPrex = menulogWriter(data, menulogStores);
    mlPre.push(...mlPrex);
  });

  setTimeout(() => {
    const deliveroo = arrayJoine(
      deliverooHeader.concat(deliverooPre)
    ).toString();

    //uber compiled

    const uber = arrayJoine(uberHeader.concat(uberPre)).toString();
    
    //ml compiled
    const menulog = arrayJoine(mlHeader.concat(mlPre)).toString();

    //main file
    const csv = arrayJoine(compiledData).toString();

    //cleansed sheet file
 
    const cleansedSheet = arrayJoine(sheetHeader.concat(sheetPrep(data))).toString();
console.log(cleansedSheet)
    //mailEngine call
    callMailengine(dateCalc, csv, menulog, deliveroo, uber, storeChecker, cleansedSheet);
    columnHeader = [];
    neededData = [];
    finalRowData = [];
    compiledData = [];
  }, 3000);


}, 10000);
//  })
