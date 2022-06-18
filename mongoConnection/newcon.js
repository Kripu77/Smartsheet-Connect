const { MongoClient } = require('mongodb');
const env = require('dotenv');
const {collectionData}= require('../utils/collectionData.js')

env.config();



//connection handler function 

// setTimeout(()=>{
const dbconnect = async (string, storesID) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    // await getallDatabases(client);

   let storeInfo= await collectionData(client, `${string}`, storesID);
   let deliverooID = await collectionData(client, "deliverooID",  storesID);
   let uberID = await collectionData(client, "uberID",  storesID)
return storeInfo;

  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

// //call the connection function
// dbconnect().catch((err) => console.log(err));

module.exports={dbconnect}
