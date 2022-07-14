let googleHeader = [

    [
        "Shop Code", 
        "Business Name",
        "Sunday hours", 
        "Monday hours",
        "Tuesday hours", 
        "Wednesday hours", 
        "Thursday hours", 
        "Friday hours", 
        "Saturday hours\n"

    ]
]

function googleWriter(data, isgoogle){

    
    let loadedData=[];

   isgoogle.map((googleStore, googleindex) => {
      return data.map((value, index, array) => {
        

          if (value[0].value == `${isgoogle[googleindex].storeNumber}`) {
           

            if (value[8].value === "Drive Thru") {
              const driveT = [
               
                value[0].value,
                isgoogle[googleindex].storeName,
                `${value[39].value}-${value[40].value}`,
                `${value[27].value}-${value[28].value}`,
                `${value[29].value}-${value[30].value}`,
                `${value[31].value}-${value[32].value}`,
                `${value[33].value}-${value[34].value}`,
                `${value[35].value}-${value[36].value}`,
                `${value[37].value}-${value[38].value}\n`,
                
              ];
           
              loadedData.push(driveT);
              return driveT;
            }

            if (value[8].value === "Food Court/ Dine In ONLY") {
              const dineIn = [
               
                value[0].value, 
                isgoogle[googleindex].storeName,
                `${value[25].value}-${value[26].value}`,
                `${value[13].value}-${value[14].value}`,
                `${value[15].value}-${value[16].value}`,
                `${value[17].value}-${value[18].value}`,
                `${value[19].value}-${value[20].value}`,
                `${value[21].value}-${value[22].value}`,
                `${value[23].value}-${value[24].value}`,
                
                
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
    googleHeader, googleWriter
  }