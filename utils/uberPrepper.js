//format fixer fn
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



  if (timeNumParser <= 5 && timeNumParser >= 0) {
    return `"10:45-23:59, 00:00-0${dayHour}"`;
  } else {
    return `10:45-${dayHour}`;
  }
}

// console.log(uberDataPrep("0:00"));

module.exports={
  uberDataPrep
}
