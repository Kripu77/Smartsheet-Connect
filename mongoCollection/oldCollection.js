//main data collection getter

const oldCollectionData = async (client, collectionName, createdDate) => {
    const database = client.db("MDM-EXTRACT");
    const storeInfo = database.collection(collectionName);
  
    let storeDetails=[];
   
    
   await storeInfo.find({ storeNumber: { $in:createdDate}   }).forEach((data) => {
    storeDetails.push(data)
    });
    console.log(storeDetails)
  
  
  return storeDetails
     
  };
  
  module.exports = { oldCollectionData };