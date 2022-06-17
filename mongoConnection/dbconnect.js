const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let dataMongo = [];

client.connect((err) => {
  const newxxx = ["3451", "3444", "3481", "8470"];

  const database = client.db("MDM-EXTRACT");

  const collection = database.collection("storeInfo");

  const cursor = collection.find({ storeNumber: { $in: newxxx } });

  cursor.forEach((doc) => dataMongo.push(doc));

  setTimeout(() => client.close(), 10000);
});

setTimeout(() => {
  console.log(dataMongo);
}, 4000);

module.exports = { dataMongo };
