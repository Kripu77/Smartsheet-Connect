let { smartsheetCaller } = require("./smartsheetConnection/getSmartsheetData");
const { dateCalc } = require("./utils/dateCalculator.js");
const { arrayJoine } = require("./utils/arrayJoin.js");
const {
  sheetHeader,
  sheetPrep,
} = require("./DeliveryPartnerTemplatingEngine/cleanSheet.js");
const {
  menulogWriter,
  mlHeader,
  mlClosureHeader,
} = require("./DeliveryPartnerTemplatingEngine/menulog.js");
const {
  deliverooHeader,
  deliverooWriter,
} = require("./DeliveryPartnerTemplatingEngine/deliveroo.js");
const {
  uberHeader,
  uberWriter,
  uberClosureHeader,
} = require("./DeliveryPartnerTemplatingEngine/uber.js");
const {
  googleHeader,
  googleWriter,
} = require("./DeliveryPartnerTemplatingEngine/google");
const { callMailengine } = require("./emailTemplating/mailEngine");
const { callDynamicMailengine } = require("./emailTemplating/dynamicMailer");
const {
  closureHeader,
  closureClean,
} = require("./DeliveryPartnerTemplatingEngine/closureCleaner");
const { getUniqueListBy } = require("./utils/uniqueList");

const { dbconnect } = require("./mongoConnection/newcon");

let finalRowData = [];
let compiledData = [];
let storeChecker = [];
let recordPusher = [];
let tempClosure = [];
let closureStore = [];
let dbLookup = [];
let oldRecordsDB = [];



//pass this as cb fn once cron execution process
main().then(()=>{
  console.log("Job Started")
}).catch((err)=>{console.log(err)})

async function main() {
  let source = await smartsheetCaller();

  //for Delivery Aggs Cleansing
  let data = source.rowData.map((datax) => {
    const { cells } = datax;
    const storeData = [...cells];
    return storeData;
  });

  //remove repetative store submission data;
  data = getUniqueListBy(data);

  //for db lookup
  data.forEach((value) => {
    dbLookup.push(value[0].displayValue);
  });

  //get old records from db
  dbconnect("oldRecords", dbLookup).then((data) => {
    oldRecordsDB.push(...data);
  });

  setTimeout(() => {
    //filter out the data if the data that we have has already been inserted to db
    oldRecordsDB.map((dbValue, dbindex) => {
      data = data.filter((value, index) => {
        return value[7].value != oldRecordsDB[dbindex].createdDate;
      });
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
    const storeDataArray = data.map((singleCell) => {
      finalRowData = singleCell.map((singleStore) => {
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
    compiledData.push(source.columnHeader);
    compiledData.push(...storeDataArray);

    //store num extractor
    function dynamicExtractor(data, lookUpValue) {
      return data.map((value) => {
        if (lookUpValue === "storeChecker") {
          return value[0].replaceAll('"', "");
        }
        if (lookUpValue === "closureChecker") {
          return value[0].displayValue;
        }
      });
    }

    //non-closure store number holder
    storeChecker.push(...dynamicExtractor(storeDataArray, `storeChecker`));
    //closure store number holder
    closureStore.push(...dynamicExtractor(tempClosure, "closureChecker"));

    let deliverooPre = [];
    let mlPre = [];
    let uberPre = [];
    let mlClosurePre = [];
    let uberClosurePre = [];
    let googlePre = [];

    //delivero conn
    dbconnect("deliverooID", storeChecker).then((deliverooTest) => {
      const deliverooPrex = deliverooWriter(data, deliverooTest);
      deliverooPre.push(...deliverooPrex);
    });

    //uber conn
    dbconnect("uberID", storeChecker).then((uberStores) => {
      const uberPrex = uberWriter(data, uberStores);
      uberPre.push(...uberPrex);
    });

    //ml conn

    dbconnect("storeInfo", storeChecker).then((menulogStores) => {
      const mlPrex = menulogWriter(data, menulogStores);
      mlPre.push(...mlPrex);
    });

    //for google bulk upload file data gen

    dbconnect("googleRecords", storeChecker).then((googleStore) => {
      const googlePrex = googleWriter(data, googleStore);
      googlePre.push(...googlePrex);
    });

    //for temp closure aggs only invoked when a store closure is received

    if (tempClosure.length > 0) {
      dbconnect("storeInfo", closureStore).then((menulogStores) => {
        const menulogClosurePre = menulogWriter(tempClosure, menulogStores);
        mlClosurePre.push(...menulogClosurePre);
      });

      dbconnect("uberID", closureStore).then((uberStores) => {
        const uberClosurePrex = uberWriter(tempClosure, uberStores);
        uberClosurePre.push(...uberClosurePrex);
      });
    }

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

      //google file

      const googleFile = arrayJoine(googleHeader.concat(googlePre)).toString();

      //cleansed sheet file

      const cleansedSheet = arrayJoine(
        sheetHeader.concat(sheetPrep(data))
      ).toString();

      //store Closure main file

      const closureStoreFinal = arrayJoine(
        closureHeader.concat(closureClean(tempClosure))
      ).toString();

      // menulog closure

      const menulogClosureFinal = arrayJoine(
        mlClosureHeader.concat(mlClosurePre)
      ).toString();

      //uber closure

      const uberClosureFinal = arrayJoine(
        uberClosureHeader.concat(uberClosurePre)
      ).toString();

      // mailEngine call only if any stores have requested changes

      storeChecker.length > 0
        ? callMailengine(
            dateCalc,
            csv,
            menulog,
            deliveroo,
            uber,
            googleFile,
            storeChecker,
            cleansedSheet
          )
        : console.log("No trading hour changes");

      tempClosure.length > 0
        ? callDynamicMailengine(
            dateCalc,
            closureStoreFinal,
            "Store Closure Request Received in the attached file via the Smartsheet portal",
            "Temproary Closure Hours",
            process.env.MASTER_CC,
            "Team"
          )
        : console.log("No temp closure");

      setTimeout(() => {
        mlPre.length > 0
          ? callDynamicMailengine(
              dateCalc,
              menulog,
              "trading hours update required on the Menulog listings, please advise once done",
              "Trading Hours Update ML",
              "kripu.khadka@hungryjacks.com.au",
              "Xuan"
            )
          : console.log("No ML Hour update");
      }, 1000);

      uberPre.length > 0
        ? callDynamicMailengine(
            dateCalc.replaceAll("-", "."),
            uber,
            "Bulk upload file for the trading hours update, please advise once done",
            "Trading Hours Update",
            "kripu.khadka@hungryjacks.com.au",
            "Esc Eng"
          )
        : console.log("No UBER Hours update");

      setTimeout(() => {
        deliverooPre.length > 0
          ? callDynamicMailengine(
              dateCalc,
              deliveroo,
              "attached file for the trading hours update, please advise once done",
              "Deliveroo Trading Hours Update HJ",
              "kripu.khadka@hungryjacks.com.au",
              "Team"
            )
          : console.log("No deliveroo Hours update");
      }, 2000);

      uberClosurePre.length > 0
        ? callDynamicMailengine(
            dateCalc,
            uberClosureFinal,
            "attached file for the store Temproaray Closure, please advise once done",
            "Temporary Closure Update Uber",
            "kripu.khadka@hungryjacks.com.au",
            "Esc Eng"
          )
        : console.log("No Uber Temp closure update");

      setTimeout(() => {
        mlClosurePre.length > 0
          ? callDynamicMailengine(
              dateCalc,
              menulogClosureFinal,
              "attached file for the store Temproaray Closure, please advise once done",
              "Temporary Closure Update",
              "kripu.khadka@hungryjacks.com.au",
              "Xuan"
            )
          : console.log("No ML Temp closure update");
      }, 2000);

      finalRowData = [];
      compiledData = [];
      storeChecker = [];
      recordPusher = [];
      tempClosure = [];
      closureStore = [];
      dbLookup = [];
      oldRecordsDB = [];
    }, 6000);
  }, 7000);
}

module.exports = {
  main,
};
