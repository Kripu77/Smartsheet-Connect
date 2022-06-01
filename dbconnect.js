const { MongoClient } = require("mongodb");
require("dotenv").config();

async function main() {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("MDM-EXTRACT");
    const storeInfo = database.collection("storeInfo");

    const query = { storeName: "Kings Cross" };
    const singleStore = await storeInfo.find().forEach((data) => {
      console.log(data._id.toHexString());
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main();
