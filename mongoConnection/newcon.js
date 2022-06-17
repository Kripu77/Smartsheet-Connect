const { MongoClient } = require('mongodb');
const env = require('dotenv');
const {collectionData}= require('../utils/collectionData.js')

env.config();



//connection handler function 

// setTimeout(()=>{
const dbconnect = async () => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    await getallDatabases(client);

   let dataTest= await collectionData(client);
   console.log(dataTest)

   module.exports={dataTest}
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

//call the connection function
dbconnect().catch((err) => console.log(err));

//get the list of databases available in our cluster

const getallDatabases = async (client) => {
  //store the info of all DBS
  const databases = await client.db().admin().listDatabases();
  //store the name of all DBS
  const dbNames = [];

  databases.databases.forEach((database) => {
    const { name } = database;

    dbNames.push(name);
  });

  console.log(...dbNames); //outputs all the databases that we have in our cluster
};

module.exports ={dbconnect}

// },8000)


//get all collections

// const collectionData = async(client)=>{
// const checkedData = ["3431"];
// const database = client.db("MDM-EXTRACT")
// const storeInfo = database.collection("storeInfo");
// const uberuuiDs = database.collection("uberID");
// const deliverooids = database.collection("deliverooID");


// // const changeStore= await storeInfo.findOne({storeNumber: '3431'})
// // console.log(changeStore)


// // const changeStoreUUIDS = await uberuuiDs.findOne({storeCode:'3431'})

// // console.log(changeStoreUUIDS)

// // const changeStoreDeliverooIDS = await deliverooids.findOne({storeNumber:'3431'})

// // console.log(changeStoreDeliverooIDS)



// await storeInfo
//   .find({ storeNumber: { $in: checkedData} })
//   .forEach((data) => {
//     console.log(data);
//   });

// }
