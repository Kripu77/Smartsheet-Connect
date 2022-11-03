const {getOldRecords} = require("../mongoLookup/oldRecords")

async function complier(source,dbLookup, data) {
    //filter out the data if the data that we have has already been inserted to db
    try {
      let oldRecordsFromDb = await getOldRecords(dbLookup);
      let oldRecordsDB = oldRecordsFromDb.oldRecordsDB;

      //filter out any existing entries present in our db/ already sent ones
      oldRecordsDB.map((dbValue, dbindex) => {
        data = data.filter((value, index) => {
          return value[7].value != oldRecordsDB[dbindex].createdDate;
        });
      });

      //to store the required datasets for comparision of records
      let recordPusher = data.map((value) => {
          return {storeNumber: value[0].value.toString(), storeName:value[1].value.toString(), dateAdded: value[4].value, effectiveDate:value[46].value,  createdDate: value[7].value };
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

      return {
        finaldata: data,
        tempClosure: tempClosure,
        recordPusher: recordPusher,
        storeDataArray:storeDataArray,
        compiledData: [source.columnHeader, ...storeDataArray],
      };
    } catch (err) {
      console.log(err);
    }}


    module.exports ={
        complier
    }