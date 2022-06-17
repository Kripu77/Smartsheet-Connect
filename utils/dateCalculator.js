// const datexx = new Date().getDate();
// console.log(datexx)
const fullDate = new Date()
const todaysDate = new Date().getDate();
const yesterday = new Date(fullDate)
const thisMonth = new Date().getMonth();
const thisYear = new Date().getFullYear();

fullDate.setDate(fullDate.getDate()-1) //subrtraction sets it to yesterdays date//month//year
console.log(fullDate.getMonth()+
1) //addition done cause month is calculated in 0-11 index based in JS
console.log(fullDate.getDate()) //gives the correct date as output


function zeroChecker (value){
if(value<10){
  return "0" + value;
}
else{
  return value;
}

}

const dateCalc = `${thisYear}-${zeroChecker(thisMonth + 1)}-${zeroChecker( todaysDate
)}`;
const tommorowDateCal = `${thisYear}-${zeroChecker(thisMonth+1) }-${zeroChecker(todaysDate+1)}`;
const yesterDayDateCal = `${thisYear}-${zeroChecker(
  fullDate.getMonth() + 1
)}-${zeroChecker(fullDate.getDate() )}`;



module.exports = {
  dateCalc,
  tommorowDateCal,
  yesterDayDateCal,
};