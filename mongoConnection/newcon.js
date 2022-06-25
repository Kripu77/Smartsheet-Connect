//main connection handler

const { MongoClient } = require("mongodb");
const env = require("dotenv");
const { collectionData } = require("../utils/collectionData.js");
const{insertData} = require("../utils/insertData.js");
const{oldCollectionData} = require("../utils/oldCollection.js")

env.config();

//connection handler function

const stores=[

  {storeNumber: "3431", createdAt:"2022-1-2", modifiedAt: "Today"}
]


const dbconnect = async (string, storesID) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();

if(string === "storeInfo" || string === "deliverooID" || string ==="uberID"){

    let storeInfo = await collectionData(client, `${string}`, storesID);
    return storeInfo;
   
  
  }
  if(string === 'insertData'){

    await insertData(client, "oldRecords", storesID )

  }
  if(string === 'oldRecords'){
    

   let oldRecords= await oldCollectionData(client, `${string}`, storesID);
   return oldRecords;

  }

  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};


module.exports = { dbconnect };
