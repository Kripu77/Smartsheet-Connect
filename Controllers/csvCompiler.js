const {dynamicExtractor} = require("../Controllers/dynamicExtractor")
// this fn returns store number based on temp closure/normal update request

async function csvCompiler (dataSet){

    try{
  
      let storeChecker = dynamicExtractor(dataSet.storeDataArray, `storeChecker`);
      let closureStore = dynamicExtractor(dataSet.tempClosure, `closureChecker`);

      return {storeChecker:storeChecker, closureStore:closureStore}
    }
    catch(err){
      console.log(err)
    }
  }
  

  module.exports ={
    csvCompiler
  }