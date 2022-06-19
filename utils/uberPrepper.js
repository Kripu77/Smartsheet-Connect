//format fixer fn
const { fifteenMinSub } = require("./fifteenMinCalc");


function formatChecker(arr) {
 const arrx = arr.split("");
  if (arrx.length > 4) {
    const value = arrx[0] + arrx[1];
    return value;
  } else {
    return arrx[0];
  }

}

//data cleaner and prep fn
function uberDataPrep(dayHour) {
  let timeNumParser = formatChecker(dayHour);
  if (timeNumParser <= 5 && timeNumParser > 0) {
    return `"10:45-23:59,00:00-0${
      dayHour === "5:00" ? "4:59" : fifteenMinSub(dayHour)
    }"`;
  } else {
    if(dayHour==='CLOSED'){
      return 'CLOSED'
    }
    else{
    return `10:45-${fifteenMinSub(dayHour)}`;}

  }
}

//brekky hr checker/ format fixxer

function brekkyHrValidator(brekkyHour) {
  let timeNumParser = formatChecker(brekkyHour);
  if (timeNumParser >= 11 || brekkyHour==='CLOSED') {
    return "CLOSED";
  } else {
    return timeNumParser >= 10 ? `${brekkyHour}-10:45` : `0${brekkyHour}-10:45`;
  }
}

module.exports = {
  uberDataPrep,
  brekkyHrValidator,
};
