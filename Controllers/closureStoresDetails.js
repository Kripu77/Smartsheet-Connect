const { menulogWriter } = require("../DeliveryPartnerTemplatingEngine/menulog");
const { uberWriter } = require("../DeliveryPartnerTemplatingEngine/uber");
const {dbconnect} = require("../mongoConnection/newcon")

//for UUIDS/Info for closure stores

async  function getClosureStoresDetails (closureStore){
    try{
        let mlClosureStores = await dbconnect("storeInfo", closureStore);
   
        let mlClosurePre = menulogWriter(tempClosure, mlClosureStores);
    
        let uberClosureStores =  await dbconnect("uberID", closureStore);
        let uberClosurePre = uberWriter(tempClosure, uberClosureStores);
    
        return {mlClosurePre: mlClosurePre, uberClosurePre:uberClosurePre}
    }

    catch(err){
        console.log(err)
    }
}

module.exports = {
    getClosureStoresDetails
}