//store closure file prep
const closureHeader =[
    ['Store Number',
    "Store Name", 
    "Store Type", 
    "Closure Start", 
    "Closure End\n"]

]


function closureClean(tempClosure){
let closureStore =[];
tempClosure.map((storeData)=>{
   
const allData =[
    storeData[0].value, 
    storeData[1].value,
    storeData[2].value, 
    `${!storeData[10].value? "TBC" :storeData[10].value}`, 
    `${!storeData[12].value? "TBC" :storeData[12].value}\n`
]
closureStore.push(allData)

})
console.log(closureStore)

return closureStore;


}

module.exports={
    closureHeader, closureClean
}