const { deliverooWriter } = require("../DeliveryPartnerTemplatingEngine/deliveroo");
const { dDashWriter } = require("../DeliveryPartnerTemplatingEngine/doordash");
const { menulogWriter } = require("../DeliveryPartnerTemplatingEngine/menulog");
const { uberWriter } = require("../DeliveryPartnerTemplatingEngine/uber");
const { dbconnect } = require("../mongoConnection/newcon");

//for UUIDS/Info for closure stores

async function getClosureStoresDetails(closureStore) {
  try {
    let mlClosureStores = await dbconnect("storeInfo", closureStore);
    let mlClosurePre = menulogWriter(tempClosure, mlClosureStores);

    //doordash sharing the master storeInfo file hence used the same info as ml
    let doordashClosurePre = dDashWriter(tempClosure, mlClosureStores);

    let uberClosureStores = await dbconnect("uberID", closureStore);
    let uberClosurePre = uberWriter(tempClosure, uberClosureStores);

    let deliverooClosureStores = await dbconnect("deliverooID", closureStore);
    let deliverooClosurePre = deliverooWriter(tempClosure, deliverooClosureStores);


    return { mlClosurePre: mlClosurePre, uberClosurePre: uberClosurePre, doordashClosurePre:doordashClosurePre, deliverooClosurePre:deliverooClosurePre };
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getClosureStoresDetails,
};
