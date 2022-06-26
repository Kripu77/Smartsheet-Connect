const mlClosureHeader = [
  [
    "State",
    "Store Number",
    "Restaurant",
    "Temp Closure Start",
    "Temp Closure End\n",
  ],
];

//templating function

function menulogClosureWriter(data, isMenulog) {
  let mlClosureHours = [];
  isMenulog.map((mlStore, mlIndex) => {
    return data.map((value) => {
      if (
        value[0].value == `${isMenulog[mlIndex].storeNumber}` &&
        "Y" === `${isMenulog[mlIndex].menulog}`
      ) {
        const store = [
          value[5].value,
          value[0].value,
          value[1].value,
          `${!value[10].value ? "TBC" : value[10].value}`,
          `${!value[12].value ? "TBC" : value[12].value}\n`,
        ];
        mlClosureHours.push(store)
      }
    });
  });
  return mlClosureHours;
}


module.exports={
    mlClosureHeader, menulogClosureWriter
}
