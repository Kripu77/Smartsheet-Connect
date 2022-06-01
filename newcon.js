const {MongoClient} = require('mongodb');

const env = require('dotenv');
env.config();



//estalish connection

const dbconnect = async()=>{


//mongouri 

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);


//wrap the connection in try, catch block for better error handling

try{
    await client.connect();
await listDatabases(client)
await allData(client)
}

catch(err){
    console.log(err)
}

finally{
    await client.close();
}



}


//invoke the connection function

dbconnect().catch((err)=>console.log(err))


//list all the databases available in our cluster

const listDatabases = async(client)=>{


    const databaselist = await client.db().admin().listDatabases();


    databaselist.databases.forEach((data)=>{
console.log(data.name)
    })

}

//get all collections in the database

const allData = async(client)=>{


  const collections =  await client.db("MDM-EXTRACT").collection("storeInfo").find()
if(collections){

   collections.forEach((data)=>{
console.log(data)
   })
}

else{
    console.log("No results found")
}
}