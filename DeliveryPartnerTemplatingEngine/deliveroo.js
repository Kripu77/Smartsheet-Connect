const{fifteenMinSub}= require('../utils/fifteenMinCalc')

const deliverooHeader = [
  [
  "Deliveroo Restaurant ID",
  "HJ Store Number",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday\n"]
];


//main cleaner fn 



function deliverooWriter(data, isDeliveroo){

    //isDeliveroo checker will only run if Store has Y on the info sheet 

    let loadedData=[];

   isDeliveroo.map((deliverooStore, deliVerooindex) => {
      return data.map((value, index, array) => {
        

          if (value[0].value == `${isDeliveroo[deliVerooindex].storeNumber}`) {
           

            if (value[8].value === "Drive Thru") {
              const driveT = [
                isDeliveroo[deliVerooindex].deliverooId,
                value[0].value,
                `${value[27].value}-${fifteenMinSub(value[28].value)}`,
                `${value[29].value}-${fifteenMinSub(value[30].value)}`,
                `${value[31].value}-${fifteenMinSub(value[32].value)}`,
                `${value[33].value}-${fifteenMinSub(value[34].value)}`,
                `${value[35].value}-${fifteenMinSub(value[36].value)}`,
                `${value[37].value}-${fifteenMinSub(value[38].value)}`,
                `${value[39].value}-${fifteenMinSub(value[40].value)}\n`
              ];
           
              loadedData.push(driveT);
              return driveT;
            }

            if (value[8].value === "Dine In") {
              const dineIn = [
                isDeliveroo[deliVerooindex].deliverooId,
                value[0].value,
                `${value[13].value}-${fifteenMinSub(value[14].value)}`,
                `${value[15].value}-${fifteenMinSub(value[16].value)}`,
                `${value[17].value}-${fifteenMinSub(value[18].value)}`,
                `${value[19].value}-${fifteenMinSub(value[20].value)}`,
                `${value[21].value}-${fifteenMinSub(value[22].value)}`,
                `${value[23].value}-${fifteenMinSub(value[24].value)}`,
                `${value[25].value}-${fifteenMinSub(value[26].value)}`,
                "\n",
              ];
              loadedData.push(dineIn)
              return dineIn;
            }
          }
        })
 
    });
       return loadedData;
  }

module.exports={
    deliverooHeader, deliverooWriter
}