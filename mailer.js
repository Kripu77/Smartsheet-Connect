let{columnHeader, neededData} = require("./smartsheetConnection/getSmartsheetData")
const {
  dateCalc,
  tommorowDateCal,
  yesterDayDateCal,
} = require("./utils/dateCalculator.js");
const { arrayJoine } = require("./utils/arrayJoin.js");
const {
  sheetHeader,
  sheetPrep,
} = require("./DeliveryPartnerTemplatingEngine/cleanSheet.js");
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
const { callClosureMailengine } = require("./utils/closureMailer");
const {
  closureHeader,
  closureClean,
} = require("./DeliveryPartnerTemplatingEngine/closureCleaner");
const { dbconnect } = require("./mongoConnection/newcon");



var finalRowData = [];
var compiledData = [];
var storeChecker = [];
var recordPusher = [];
var tempClosure = [];
var dbLookup =[];
var oldRecordsDB = [];



//cron will execute as per the hour we set
// cron.schedule("0 20 * * *", () => {


setTimeout(() => {
  

  

  //for Delivery Aggs Cleansing
  let data = neededData.map((datax) => {
    const { cells } = datax;
    const storeData = [...cells];
    return storeData;
  });

  

  //to store the required datasets for comparision of records
  data.forEach((value) => {
    recordPusher.push({
      storeNumber: value[0].value.toString(),
      date: value[4].value,
      createdDate: value[7].value,
    });
  });


  //extracts if any store have filled out temproary closure data
  tempClosure = data.filter((inputDetails) => {
    return inputDetails[9].value === "Temporary Closure Activation";
  });

  //filters out the temp closure store from the normal distribution list
  data = data.filter((inputDetails) => {
    return inputDetails[9].value != "Temporary Closure Activation";
  });


// logic simplified for main file
    const storeDataArray =data.map((singleCell) => {
    finalRowData=singleCell.map((singleStore) => {
            const { value, displayValue } = singleStore;
            return !value
              ? ""
              : displayValue
              ? `"${displayValue.toString()}"`
              : `"${value.toString()}"`;
          });
          finalRowData.push("\n");
          return finalRowData;
    });
    //complied state for normal hours file column and row
  compiledData.push(columnHeader);
 compiledData.push(...storeDataArray)
   





  //store num extractor
  function dynamicExtractor(data, lookUpValue) {
    return data.map((value) => {
      if (lookUpValue === "storeChecker") {
        return value[0];
      }
    });
  }

  storeChecker.push(...dynamicExtractor(storeDataArray, `storeChecker`));

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

  //finally insert the historyRecord data
  recordPusher.length > 0
    ? dbconnect("insertData", recordPusher)
    : console.log("No data to insert");

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

    const cleansedSheet = arrayJoine(
      sheetHeader.concat(sheetPrep(data))
    ).toString();

    //store Closure main file

    const closureStore = arrayJoine(
      closureHeader.concat(closureClean(tempClosure))
    ).toString();

    //mailEngine call only if any stores have requested changes

    storeChecker.length > 0
      ? callMailengine(
          dateCalc,
          csv,
          menulog,
          deliveroo,
          uber,
          storeChecker,
          cleansedSheet
        )
      : console.log("No trading hour changes");

    tempClosure.length > 0
      ? callClosureMailengine(
          dateCalc,
          closureStore,
          "Store Closure Request Received in the attached file via Smartsheet portal",
          "Temproary Closure Hours",
          "kripu.khadka@hungryjacks.com.au"
        )
      : console.log("No temp closure");

    columnHeader = [];
    neededData = [];
    finalRowData = [];
    compiledData = [];
  }, 7000);
}, 10000);
//  })
