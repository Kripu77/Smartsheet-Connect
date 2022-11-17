const {
  sheetHeader,
  sheetPrep,
} = require("../DeliveryPartnerTemplatingEngine/cleanSheet");
const {
  closureClean,
  closureHeader,
} = require("../DeliveryPartnerTemplatingEngine/closureCleaner");
const {
  deliverooHeader,
} = require("../DeliveryPartnerTemplatingEngine/deliveroo");
const { googleHeader } = require("../DeliveryPartnerTemplatingEngine/google");
const {
  mlHeader,
  mlClosureHeader,
} = require("../DeliveryPartnerTemplatingEngine/menulog");
const {
  uberHeader,
  uberClosureHeader,
} = require("../DeliveryPartnerTemplatingEngine/uber");
const {dDashWriter} = require("../DeliveryPartnerTemplatingEngine/doordash");
const {deliverooWriter} = require("../DeliveryPartnerTemplatingEngine/deliveroo");
const { arrayJoine } = require("../utils/arrayJoin");
const { dateCalc} = require("../utils/dateCalculator");
const {streamFileWriter} = require("../File Writer/writer");

async function sheetSender(
  storeChecker,
  dataSet,
  aggslookupDB,
  closureStoresInfo
) {
  try {
    //destrcutring the objects set in the aggregatorLookup fn
    let { finaldata, compiledData, tempClosure } = dataSet;
    let { deliverooPre, uberPre, mlPre, googlePre } = aggslookupDB;
    let { mlClosurePre, uberClosurePre,doordashClosurePre, deliverooClosurePre  } = closureStoresInfo;

  
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
      sheetHeader.concat(sheetPrep(finaldata))
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

    //doordash closure
    const doordashClosureFinal = arrayJoine(
      mlClosureHeader.concat(doordashClosurePre)

    ).toString();




    //main file writer
    storeChecker.length>0 ? streamFileWriter(dateCalc, "Trading Hours Changes ", csv): console.log("No new request");

    //Oracle file writer
    storeChecker.length>0 ? streamFileWriter(dateCalc, "Oracle Trading Hours Update ", cleansedSheet): console.log("No new request");

    //google file writer
    storeChecker.length>0 ? streamFileWriter(dateCalc, "Google Upload Hours ", googleFile): console.log("No Google Hours update");

    tempClosure.length > 0
      ? streamFileWriter(dateCalc, "Temporary Clousre Hours", closureStoreFinal)
      : console.log("No temp closure");

   
      mlPre.length > 0
        ?  streamFileWriter(dateCalc, "Trading Hours Update ML", menulog)
        : console.log("No ML Hour update");
   

    uberPre.length > 0
      ? streamFileWriter(dateCalc.replaceAll("-", "."), "Trading Hours Update Uber Eats", uber)
      : console.log("No UBER Hours update");
 
  
     


    uberClosurePre.length > 0
      ?  streamFileWriter(dateCalc, "Temporary Closure Update Uber", uberClosureFinal)
      : console.log("No Uber Temp closure update");

   
      mlClosurePre.length > 0
        ?  streamFileWriter(dateCalc, "Temporary Closure Update ML", menulogClosureFinal)
        : console.log("No ML Temp closure update");

  
        doordashClosurePre.length>0?
        streamFileWriter(dateCalc, "Temporary Closure Update Doordash", doordashClosureFinal)
        : console.log("No Doordash Temp closure update");


  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  sheetSender,
};
