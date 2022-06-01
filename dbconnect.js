const {MongoClient} = require('mongodb');

async function main() {

    const uri= "mongodb+srv://MDM:Megajack1@cluster0.ghg9u.mongodb.net/?retryWrites=true&w=majority"

    const client = new MongoClient(uri);

    try {
        await client.connect();
    
        const database = client.db('MDM-EXTRACT');
    const storeInfo = database.collection('storeInfo');

    const query = { storeName: 'Kings Cross' };
    const singleStore = await storeInfo.find().forEach((data)=>{
console.log(data.storeName)
    });
    
     
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }

}

main()