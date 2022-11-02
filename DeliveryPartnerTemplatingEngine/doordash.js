
//templating function

function dDashWriter(data, isDD) {
  let ddHours = [];
  isDD.map((ddStore, ddIndex) => {
    return data.map((value) => {
      if (
        value[0].value == `${isDD[ddIndex].storeNumber}` &&
        "Y" === `${isDD[ddIndex].doordash}`
      ) {
        if (value[9].value === "Temporary Closure Activation") {
          const store = [
            value[5].value,
            value[0].value,
            value[1].value,
            `${!value[10].value ? "TBC" : value[10].value}`,
            `${!value[12].value ? "TBC" : value[12].value}\n`,
          ];
          ddHours.push(store);
          return store;
        }
  
      }
    });
  });
  return ddHours;
}

module.exports = { dDashWriter };
