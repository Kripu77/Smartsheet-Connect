const {checkerData} = require("./localWriter.js")
console.log(checkerData)

const collectionData = async (client) => {
  const database = client.db("MDM-EXTRACT");
  const storeInfo = database.collection("storeInfo");
  const uberuuiDs = database.collection("uberID");
  const deliverooids = database.collection("deliverooID");

  let storeDetails=[];
  let storeUberUUID =[];
  let storeDeliverooID =[];

  // const changeStore= await storeInfo.findOne({storeNumber: '3431'})
  // console.log(changeStore)

  // const changeStoreUUIDS = await uberuuiDs.findOne({storeCode:'3431'})

  // console.log(changeStoreUUIDS)

  // const changeStoreDeliverooIDS = await deliverooids.findOne({storeNumber:'3431'})

  // console.log(changeStoreDeliverooIDS)

  const newxxx = ["3451", "3444", "3481", "8470"];
  
 await storeInfo.find({ storeNumber: { $in: newxxx } }).forEach((data) => {
  storeDetails.push(data)
  });



  await uberuuiDs.find({ storeCode: { $in: newxxx } }).forEach((data) => {
    storeUberUUID.push(data)
  });

  await deliverooids.find({ storeNumber: { $in: newxxx } }).forEach((data) => {
    storeDeliverooID.push(data)
  });

    console.log(storeDetails);
    console.log(storeUberUUID);
    console.log(storeDeliverooID)
};

module.exports = { collectionData };
