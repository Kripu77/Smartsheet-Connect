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
    return `10:45-23:59,00:00-0${
      dayHour === "5:00" ? "4:59" : fifteenMinSub(dayHour)
    }`;
  } else {
    if (dayHour === "CLOSED") {
      return "CLOSED";
    } else {
      return `10:45-${fifteenMinSub(dayHour)}`;
    }
  }
}

//brekky hr checker/ format fixxer

function brekkyHrValidator(brekkyHour) {
  let timeNumParser = formatChecker(brekkyHour);
  if (timeNumParser >= 11 || brekkyHour === "CLOSED") {
    return "CLOSED";
  } else {
    return timeNumParser >= 10 ? `${brekkyHour}-10:45` : `0${brekkyHour}-10:45`;
  }
}

//main formater file for 24*7 stores
function dataInverse(data) {
  let result = data.map((s) => s.split(/,\s*/));

  // Only change something when there is an item that does not have doubly entry
  if (result.some(({ length }) => length <= 2)) {
    // must rotate second items
    let overflow;
    [result, overflow] = result.reduce(
      ([acc, prev], parts) => [
        [...acc, [`${parts.shift()}`, ...prev].join(",")],
        parts,
      ],
      [[], []]
    );

    // What drops off at the end, should be inserted at the start
    result[0] = [result[0], ...overflow].join(",");
    //  add \n to the last index of the array
   
  }
   result.push("\n")
  // only insert "" if the string matches the 24*7 fromat
  const formatted = result.map((string) => {
    return string.length <= 20 ? string : `"${string}\"`;
  });
  return formatted;
}

module.exports = {
  uberDataPrep,
  brekkyHrValidator,
  dataInverse,
};
