
const fullDate = new Date();
const tomorrowsFullDate = new Date();
const todaysDate = new Date().getDate();
const yesterday = new Date(fullDate);
const thisMonth = new Date().getMonth();
const thisYear = new Date().getFullYear();

fullDate.setDate(fullDate.getDate() - 1); //subrtraction sets it to yesterdays date//month//year
tomorrowsFullDate.setDate(tomorrowsFullDate.getDate() + 1);



//to match smartsheet date format
function zeroChecker(value) {
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
}

//required dates stored in variables
const dateCalc = `${thisYear}-${zeroChecker(thisMonth + 1)}-${zeroChecker(
  todaysDate
)}`;
const tommorowDateCal = `${thisYear}-${zeroChecker(
  thisMonth + 1
)}-${zeroChecker(tomorrowsFullDate.getDate())}`;
const yesterDayDateCal = `${thisYear}-${zeroChecker(
  fullDate.getMonth() + 1
)}-${zeroChecker(fullDate.getDate())}`;

console.log(dateCalc, tommorowDateCal, yesterDayDateCal);

module.exports = {
  dateCalc,
  tommorowDateCal,
  yesterDayDateCal,
};
