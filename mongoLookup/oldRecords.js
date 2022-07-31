const {dbconnect} = require("../mongoConnection/newcon")

async function getOldRecords (dbLookup){

    try{
     let data= await dbconnect("oldRecords", dbLookup);
      return {oldRecordsDB: data}
    }
    catch(err){
      console.log(err)
    }
    
  }


  module.exports={
    getOldRecords
  }