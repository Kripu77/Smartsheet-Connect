var client = require("smartsheet");
var smartsheet = client.createClient({
  accessToken: "9RwrziYobnX1MCLRYQ6w7cbfGGS6cI6knXJq1",
  logLevel:'info'
});

var options = {
  queryParameters: {
    include: "attachments",
    includeAll: true,
  },
};
smartsheet.sheets
  .listSheets(options)
  .then(function (sheetList) {
    console.log(sheetList[92]);
  })
  .catch(function (error) {
    console.log(error);
  });


// smartsheet.sheets
//   .listSheets(options)
//   .then(function (result) {
//     var sheetId = result.data.id; // Choose the first sheet

//     // Load one sheet
//     smartsheet.sheets
//       .getSheet({ id: sheetId })
//       .then(function (sheetInfo) {
//         console.log(sheetInfo);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   })
//   .catch(function (error) {
//     console.log(error);
//   });