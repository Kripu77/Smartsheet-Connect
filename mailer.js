let { smartsheetCaller } = require("./smartsheetConnection/getSmartsheetData");
const { getUniqueListBy } = require("./utils/uniqueList");
const { complier } = require("./Controllers/compiler");
const { csvCompiler } = require("./Controllers/csvCompiler");
const { aggregatorLookup } = require("./mongoLookup/aggsRecords");
const { closureCompiler } = require("./Controllers/closureCompiler");
const { sheetSender } = require("./Controllers/sheetSender");

//pass this as cb fn once cron execution process
main()
 

async function main() {
  try {
    //data from smartsheet source
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
    let dbLookup = data.map((value) => {
      return value[0].displayValue;
    });

    //returns closure, compiled, and records that needs to be pushed to the db
    let dataSet = await complier(source, dbLookup, data);

    //returns store number for db lookup
    let numExtraction = await csvCompiler(dataSet);

    //destrcutring the datasets
    let { storeChecker, closureStore } = numExtraction;

    //returns UUID/ID for delivery partners
    let aggslookupDB = await aggregatorLookup(numExtraction, dataSet);

    //for temp closure aggs only invoked when a store closure is received
    let closureStoresInfo = await closureCompiler(closureStore);

    //finally invoke the sheetSender fn with required dataset
    await sheetSender(storeChecker, dataSet, aggslookupDB, closureStoresInfo);
  } catch (err) {
    console.log(err);
  }
  finally{
    console.log("Job Completed")
  }
}
module.exports = {
  main,
};
