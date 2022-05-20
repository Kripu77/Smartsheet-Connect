const http = require('http');
var fs = require("fs")
const { stringify } = require('querystring');
var client = require("smartsheet");
var smartsheet = client.createClient({
  accessToken: "9RwrziYobnX1MCLRYQ6w7cbfGGS6cI6knXJq1",
  
});




// Set options
var options = {
  sheetId: 126087943481220 // Id of Sheet
, columnId:6710390647220100
 
  };
  
  smartsheet.sheets.getColumns(options)
  .then(function(columnList) {
    console.log(columnList);
  })
  .catch(function(error) {
    console.log(error);
  });


// smartsheet.sheets.getColumns(options).then((resp)=>{

// fs.writeFile("test.txt", `${resp.title} \t ${resp.options}` , 'utf-8', (err, res)=>{
//   if(err) throw  err
// console.log(res)
// })

//   }) 
  
//   .catch(function(error) {
//     console.log(error);
//   });