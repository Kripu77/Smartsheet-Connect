var client = require("smartsheet");
const fs= require('fs');
var smartsheet = client.createClient({
  accessToken: "9RwrziYobnX1MCLRYQ6w7cbfGGS6cI6knXJq1",
});

var neededData =[];
const options = {
  id: 126087943481220,
};

const {dateCalc, tommorowDateCal, yesterDayDateCal} = require("./index.js")
console.log(dateCalc)

// async function dataFetcher(options){
// const newData = await smartsheet.sheets.getSheet(options);
 
//  // console.log(newSheet[43].cells[45])
//  console.log(newData)
// //  const filterd = newSheet.filter((idx) => {
// //    const { cells, rowNumber } = idx;
// //    return (
// //      cells[45].value === dateCalc ||
// //      cells[45].value === tommorowDateCal ||
// //      cells[45].value === yesterDayDateCal
// //    );
// //  });
// //  neededData.push(...filterd);
// }
// dataFetcher();



smartsheet.sheets
  .getSheet(options)
  .then((sheetInfo) => {
    //   console.log(sheetInfo.rows)
      const newSheet = Array.from(sheetInfo.rows);
      // console.log(newSheet[43].cells[45])
  const filterd=newSheet.filter((idx)=>{
       const {cells, rowNumber} = idx;
      return cells[45].value === dateCalc || cells[45].value === tommorowDateCal || cells[45].value===yesterDayDateCal
   })
   neededData.push(...filterd)
   console.log(...filterd)
  });


  //cell 45 for effective data column id 6956681251841924


  // console.log(neededData)

  setTimeout(()=>{
   console.log(neededData.length)
neededData.forEach((singleStore)=>{

  const {cells}= singleStore
  console.log(cells);

  fs.writeFile("trading hours.csv", `${cells.map((cell)=>{
    return !cell.value ? "mm " : cell.value

  })}\n`,{flag:'a'},(err, res)=>{
if(err) throw err
  } )
})
  }, 15000)