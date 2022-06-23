// main clean sheet provider fn

const sheetHeader =[
    [
    "Store Number",
    "Restaurant",
    "State",
    "Day",
    "Drive Thru Open",
    "Drive Thru Close",
    "Dine In Open", 
    "Dine In Close",
    "Effective Date\n"
    ]
 ]


 function sheetPrep(data){
    let cleansedData =[];
     data.map((value)=>{
        const allData =[
            value[0].value,
            value[1].value,
            value[5].value,
            "Monday",
            value[27].value,
            value[28].value,
            value[13].value,
            value[14].value,
            value[value.length - 3].value,
            "\n",
            value[1].value,
            value[5].value,
            "Tuesday",
            value[29].value,
            value[30].value,
            value[15].value,
            value[16].value,
            "\n",
            value[1].value,
            value[5].value,
            "Wednesday",
            value[31].value,
            value[32].value,
            value[17].value,
            value[18].value,
            "\n",
            value[1].value,
            value[5].value,
            "Thursday",
            value[33].value,
            value[34].value,
            value[19].value,
            value[20].value,
            "\n",
             value[1].value,
             value[5].value,
            "Friday",
            value[35].value,
            value[36].value,
            value[21].value,
            value[22].value,
            "\n",

            value[1].value,
            value[5].value,
            "Saturday",
            value[37].value,
            value[38].value,
            value[23].value,
            value[24].value,
            "\n",
            value[1].value,
            value[5].value,
             "Sunday",
            value[39].value,
            value[40].value,
            value[25].value,
            value[26].value,

            "\n"
        ]

cleansedData.push(allData)

     })
     return cleansedData

 }

 module.exports={sheetPrep, sheetHeader}