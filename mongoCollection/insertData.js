//data insertion async function


const insertData = async(client, collectionName, values )=>{

    const database = client.db("MDM-EXTRACT");
    const collection = database.collection(collectionName);

    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await collection.insertMany(values, options);
    console.log(`${result.insertedCount} stores were inserted`);


}

module.exports={insertData}