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
const { callDynamicMailengine } = require("../emailTemplating/dynamicMailer");
const { callMailengine } = require("../emailTemplating/mailEngine");
const { arrayJoine } = require("../utils/arrayJoin");
const { dateCalc } = require("../utils/dateCalculator");
require("dotenv").config();

async function sheetSender(
  storeChecker,
  dataSet,
  aggslookupDB,
  closureStoresInfo
) {
  try {
    //destrcutring the objects set in the aggregatorLookup fn
    let { finaldata, compiledData, tempClosure } = dataSet;
    let {  uberPre, mlPre, googlePre } = aggslookupDB;
    let { mlClosurePre, uberClosurePre, doordashClosurePre } = closureStoresInfo;

   

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



    // mailEngine call only if any stores have requested changes
 // mailEngine call only if any stores have requested changes
 setTimeout(()=>{
  storeChecker.length > 0
  ? callMailengine(
      dateCalc,
      csv,
      menulog,
      uber,
      googleFile,
      storeChecker,
      cleansedSheet
    )
  : console.log("No trading hour changes");
}, 1300)
    

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

    //used setTimeout to resolve issue with outlook rate limitation while sending automated concurrent emails. Eg: 4 per Second - refer to outlook nodemailer docs from microsoft

    setTimeout(() => {
      mlPre.length > 0
        ? callDynamicMailengine(
            dateCalc,
            menulog,
            "trading hours update required on the Menulog listings, please advise once done",
            "Trading Hours Update ML",
            process.env.MENULOG_RECEIPIENT,
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
            process.env.UBER_RECEIPIENT,
            "Esc Eng"
          )
        : console.log("No UBER Hours update");
   
    setTimeout(() => {
    uberClosurePre.length > 0
      ? callDynamicMailengine(
          dateCalc,
          uberClosureFinal,
          "attached file for the store Temporary Closure, please advise once done",
          "Temporary Closure Update Uber",
         process.env.UBER_RECEIPIENT,
          "Esc Eng"
        )
      : console.log("No Uber Temp closure update");
    }, 1500);

    setTimeout(() => {
      mlClosurePre.length > 0
        ? callDynamicMailengine(
            dateCalc,
            menulogClosureFinal,
            "attached file for the store Temporary Closure, please advise once done",
            "Temporary Closure Update",
            process.env.MENULOG_RECEIPIENT,
            "Xuan"
          )
        : console.log("No ML Temp closure update");
    }, 3000);

   
   
      setTimeout(()=>{
      doordashClosurePre.length>0? callDynamicMailengine(
       dateCalc,
       doordashClosureFinal,
       "attached file for the store Temporary Closure in the doordash listings, please advise once done",
       "Temporary Closure Update Doordash",
       process.env.DOORDASH_CC,
       "There"
     )
   : console.log("No Doordash Temp closure update");
   
     }, 2800)
   
  } catch (err) {
    console.log(err);
  }

 

}



module.exports = {
  sheetSender,
};
