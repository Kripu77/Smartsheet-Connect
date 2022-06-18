

const collectionData = async (client, collectionName, storesID) => {
  const database = client.db("MDM-EXTRACT");
  const storeInfo = database.collection(collectionName);
  // const uberuuiDs = database.collection("uberID");
  // const deliverooids = database.collection("deliverooID");

  let storeDetails=[];
  // let storeUberUUID =[];
  // let storeDeliverooID =[];

  // const changeStore= await storeInfo.findOne({storeNumber: '3431'})
  // console.log(changeStore)

  // const changeStoreUUIDS = await uberuuiDs.findOne({storeCode:'3431'})

  // console.log(changeStoreUUIDS)

  // const changeStoreDeliverooIDS = await deliverooids.findOne({storeNumber:'3431'})

  // console.log(changeStoreDeliverooIDS)

  
 
  
 await storeInfo.find({ storeNumber: { $in:storesID  } }).forEach((data) => {
  storeDetails.push(data)
  });



  // await uberuuiDs.find({ storeCode: { $in: newxxx } }).forEach((data) => {
  //   storeUberUUID.push(data)
  // });

  // await deliverooids.find({ storeNumber: { $in: newxxx } }).forEach((data) => {
  //   storeDeliverooID.push(data)
  // });
return storeDetails
   
};

module.exports = { collectionData };
