const { deliverooWriter } = require("../DeliveryPartnerTemplatingEngine/deliveroo");
const { googleWriter } = require("../DeliveryPartnerTemplatingEngine/google");
const { menulogWriter } = require("../DeliveryPartnerTemplatingEngine/menulog");
const { uberWriter } = require("../DeliveryPartnerTemplatingEngine/uber");
const {dbconnect} = require("../mongoConnection/newcon")

async function aggregatorLookup ( numExtraction, dataSet){

    try{
        let { storeChecker, closureStore} = numExtraction;
        let{ finaldata, recordPusher, compiledData, storeDataArray, tempClosure} = dataSet;

        //get records from all req collection to make the ID's ready for csv gen engine
        let deliverooCollection = await dbconnect("deliverooID", storeChecker);
        let deliverooPre = deliverooWriter(finaldata, deliverooCollection);
      
        let uberCollection = await dbconnect("uberID", storeChecker)
        let uberPre = uberWriter(finaldata, uberCollection);

        let storeInfoCollection = await dbconnect("storeInfo", storeChecker);
        let mlPre = menulogWriter(finaldata, storeInfoCollection);

        let googleRecords = await dbconnect("googleRecords", storeChecker);
        let googlePre = googleWriter(finaldata, googleRecords);

      

       
        //insert any new/unique store vs sent previously to filter repetative data consumption
        recordPusher.length > 0
        ? dbconnect("insertData", recordPusher)
        : console.log("No data to insert");
        
        

        return {deliverooPre:deliverooPre, uberPre:uberPre, mlPre:mlPre, googlePre:googlePre}

    }

    catch(err){
        console.log(err)
    }
}


module.exports ={ aggregatorLookup}