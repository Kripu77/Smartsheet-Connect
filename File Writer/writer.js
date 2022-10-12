const fs = require("fs");
const path = require('path');
const folderPath = path.resolve(__dirname, "../../Results")



//streams based file writer

let streamFileWriter = (timeStamp, name, source)=>{
  let writeStream = fs.createWriteStream(`${folderPath}/${name}${timeStamp}.csv`,
  { flags: "a", encoding: "utf-8"});

source.map((value)=>{



//write the data with utf-8 encoding
writeStream.write(`"${value.storeFullAddress}",${value.subUrb},${value.productName},${value.price},${value.CalorieInfo}\n`);



  
})

writeStream.on("finish", ()=>{
  console.log(`Written files in results folder`)
})

writeStream.end();
}


module.exports = {
  streamFileWriter
}