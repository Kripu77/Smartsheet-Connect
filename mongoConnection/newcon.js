//main connection handler

const { MongoClient } = require("mongodb");
const env = require("dotenv");
const { collectionData } = require("../utils/collectionData.js");

env.config();

//connection handler function


const dbconnect = async (string, storesID) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    let storeInfo = await collectionData(client, `${string}`, storesID);
    return storeInfo;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};



module.exports = { dbconnect };
