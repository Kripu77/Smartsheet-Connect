//test module only

const collectionData = async (client, collectionName, storesID) => {
  const database = client.db("MDM-EXTRACT");
  const storeInfo = database.collection(collectionName);

  let storeDetails=[];
 
  
 await storeInfo.find({ storeNumber: { $in:storesID  } }).forEach((data) => {
  storeDetails.push(data)
  });


return storeDetails
   
};

module.exports = { collectionData };
