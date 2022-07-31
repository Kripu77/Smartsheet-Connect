
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



  module.exports ={
    dynamicExtractor
  }