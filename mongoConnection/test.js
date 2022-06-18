const { dbconnect } = require("./newcon");
const storesIDx = ["3104", "3603", "3501", "3541", "3593", "5362"];
let datass  =[]
 dbconnect('storeInfo', storesIDx).then((data)=>{
 datass.push(...data);
})
setTimeout(()=>{console.log(datass)},4000)