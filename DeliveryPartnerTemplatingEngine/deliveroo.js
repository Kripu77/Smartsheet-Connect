const deliverooHeader = [
  "Deliveroo Restaurant ID",
  "HJ Store Number",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday\n"
];


//main cleaner fn 



function deliverooWriter(data, isDeliveroo){

    //isDeliveroo checker will only run if Store has Y on the info sheet 

    let loadedData=[];

   isDeliveroo.map((deliverooStore, deliVerooindex) => {
      return data.map((value, index, array) => {
          // console.log(isDeliveroo[index].storeNumber)

          if (value[0].value == isDeliveroo[deliVerooindex].storeNumber) {
           

            if (value[8].value === "Drive Thru") {
              const driveT = [
                isDeliveroo[deliVerooindex].deliverooId,
                value[0].value,
                `${value[27].value}- ${value[28].value}`,
                `${value[29].value}- ${value[30].value}`,
                `${value[31].value}- ${value[32].value}`,
                `${value[33].value}- ${value[34].value}`,
                `${value[35].value}- ${value[36].value}`,
                `${value[37].value}- ${value[38].value}`,
                `${value[39].value}- ${value[40].value}\n`
              ];
              console.log([...driveT])
              loadedData.push(...driveT);
              return driveT;
            }

            if (value[8].value === "Dine In") {
              const dineIn = [
                "Deliveroo ID Here",
                value[0].value,
                `${value[13].value}- ${value[14].value}`,
                `${value[15].value}- ${value[16].value}`,
                `${value[17].value}- ${value[18].value}`,
                `${value[19].value}- ${value[20].value}`,
                `${value[21].value}- ${value[22].value}`,
                `${value[23].value}- ${value[24].value}`,
                `${value[25].value}- ${value[26].value}`,
                "\n",
              ];
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