//main connection handler

const { MongoClient } = require("mongodb");
const env = require("dotenv");
const { collectionData } = require("../mongoCollection/collectionData.js");
const { insertData } = require("../mongoCollection/insertData.js");
const { oldCollectionData } = require("../mongoCollection/oldCollection.js");

env.config();

//connection handler function

const stores = [
  { storeNumber: "3431", createdAt: "2022-1-2", modifiedAt: "Today" },
];

const dbconnect = async (string, storesID) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    if (
      string === "storeInfo" ||
      string === "deliverooID" ||
      string === "uberID" || string ==="googleRecords"
    ) {
      let storeInfo = await collectionData(client, `${string}`, storesID);
      return storeInfo;
    }
    if (string === "insertData") {
      await insertData(client, "oldRecords", storesID);
    }
    if (string === "oldRecords") {
      let oldRecords = await oldCollectionData(client, `${string}`, storesID);
      return oldRecords;
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

// console.log(dbconnect("googleRecords", ["3431"]).then((res)=>console.log(res)))

module.exports = { dbconnect };


