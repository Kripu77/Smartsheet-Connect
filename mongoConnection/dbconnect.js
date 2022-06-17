const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});



  function test(collectionN, newxxx){

    
let dataMongo = [];
    //  console.log(lookupStoreID)
    setTimeout(()=>{
    
    client.connect((err) => {
      
    
      const database = client.db("MDM-EXTRACT");
    
      const collection = database.collection(collectionN);
    
    
      const cursor = collection.find({ storeNumber: { $in: newxxx } });
    
      cursor.forEach((doc) => dataMongo.push(doc));
    
      setTimeout(() => client.close(), 2000);
      return dataMongo;
    });
    return dataMongo;
    
    
  }, 1000)
    
    } 





module.exports = { test };
