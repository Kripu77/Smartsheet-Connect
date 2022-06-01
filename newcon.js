const { MongoClient } = require('mongodb');
const env = require('dotenv');

env.config();



//connection handler function 

const dbconnect = async()=>{


    const uri = process.env.MONGODB_URI;

    const client = new MongoClient(uri);


    try{

        await client.connect();
    
        await getallDatabases(client)

        await collectionData(client)

    }

    catch(err){

        console.log(err);

    }

    finally{
        await client.close();
    }
}


//call the connection function
dbconnect().catch((err)=>console.log(err)) 

//get the list of databases available in our cluster


const getallDatabases = async(client)=>{

//store the info of all DBS
    const databases = await client.db().admin().listDatabases();
//store the name of all DBS
const dbNames = [];

  databases.databases.forEach((database)=>{

       const {name} = database;

       dbNames.push(name)
   })


   console.log(...dbNames) //outputs all the databases that we have in our cluster

}

//get all collections

const collectionData = async(client)=>{

const database = client.db("MDM-EXTRACT")
const storeInfo = database.collection("storeInfo");
const uberuuiDs = database.collection("uberID");
const deliverooids = database.collection("deliverooID");


await storeInfo.find().forEach((data)=>{
    console.log(data)
})


await uberuuiDs.find().forEach((data)=>{

    console.log(data.storeName)
})


await deliverooids.find().forEach((data)=>{

    console.log(data.deliverooId)
})

}
