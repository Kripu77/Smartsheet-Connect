// const datexx = new Date().getDate();
// console.log(datexx)

const todaysDate = new Date().getDate();
const thisMonth = new Date().getMonth();
const thisYear = new Date().getFullYear();

// console.log(tomorrowsDate)

const dateCalc = `${thisYear}-0${thisMonth+1}-${todaysDate}`;
const tommorowDateCal = `${thisYear}-0${thisMonth+1 }-${todaysDate+1}`;
const yesterDayDateCal = `${thisYear}-0${thisMonth+1}-${todaysDate - 1}`;

// console.log(dateCalc, tommorowDateCal, yesterDayDateCal)

module.exports = {
  dateCalc,
  tommorowDateCal,
  yesterDayDateCal,
};