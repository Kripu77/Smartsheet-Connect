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
const {callClosureMailengine} =require("./utils/closureMailer");
const{  closureHeader, closureClean} =require("./DeliveryPartnerTemplatingEngine/closureCleaner")
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

  //complied state for normal hours file & filter for the main file
  compiledData.push(columnHeader);
  let storeClosureFilter = storeDataArray.filter((value)=>{
    return !value ===value.includes('"Temporary Closure Activation"')
  })
  //  console.log(storeClosureFilter)
  compiledData.push(...storeClosureFilter);



  //for Delivery Aggs Cleansing
  let data = neededData.map((datax) => {
    const { cells } = datax;
    const storeData = [...cells];
    return storeData;
  });


  //extracts if any store have filled out temproary closure data
  tempClosure = data.filter((inputDetails)=>{
  return inputDetails[9].value === "Temporary Closure Activation"

  })


  //filters out the temp closure store from the normal distribution list
 data = data.filter((inputDetails)=>{

    return inputDetails[9].value != "Temporary Closure Activation"

  })


  //store num extractor
  function dynamicExtractor(data, lookUpValue) {
    return data.map((value) => {
      if (lookUpValue === "storeChecker") {
        return value[0].replaceAll('"', "");
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
  storeChecker.push(...dynamicExtractor(storeClosureFilter, `storeChecker`));

  // console.log(storeChecker)

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

    //store Closure main file

    const closureStore = arrayJoine(closureHeader.concat(closureClean(tempClosure))).toString()

    //mailEngine call only if any stores have requested changes
  
     storeChecker.length >1 ?callMailengine(dateCalc, csv, menulog, deliveroo, uber, storeChecker, cleansedSheet) : console.log("Hello WorldXD");

     tempClosure.length>1 ?  callClosureMailengine(dateCalc, closureStore) : console.log("XD XD")
    
    columnHeader = [];
    neededData = [];
    finalRowData = [];
    compiledData = [];
  }, 3000);


}, 10000);
//  })
