const { fifteenMinSub } = require("../utils/fifteenMinCalc");

const mlHeader = [
  [
    "Store Number",
    "Restaurant",
    "Menulog",
    "Day",
    "Open",
    "Close",
    "Effective Date",
  ],
];

//templating function

function menulogWriter(data, isMenulog) {
  let mlHours = [];
  isMenulog.map((mlStore, mlIndex) => {

    return data.map((value) => {

      if (value[0].value == `${isMenulog[mlIndex].storeNumber}` && "Y" === `${isMenulog[mlIndex].menulog}`) {
        console.log(isMenulog[mlIndex].menulog);
        if (value[8].value === "Drive Thru") {
          const driveT = [
            value[0].value,
            value[1].value,
            "Y",
            "Monday",
            value[27].value,
            fifteenMinSub(value[28].value),
            value[value.length - 3].value,
            "\n",
            value[1].value,
            "Y",
            "Tuesday",
            value[29].value,
            fifteenMinSub(value[30].value),
            "\n",
            value[1].value,
            "Y",
            "Wednesday",
            value[31].value,
            fifteenMinSub(value[32].value),
            "\n",
            value[1].value,
            "Y",
            "Thursday",
            value[33].value,
            fifteenMinSub(value[34].value),
            "\n",

            value[1].value,
            "Y",
            "Friday",
            value[35].value,
            fifteenMinSub(value[36].value),

            "\n",

            value[1].value,
            "Y",
            "Saturday",
            value[37].value,
            fifteenMinSub(value[38].value),

            "\n",

            value[1].value,
            "Y",
            "Sunday",
            value[39].value,
            fifteenMinSub(value[40].value),

            "\n",
          ];
          mlHours.push(driveT);
          return driveT;
        }

        if (value[8].value === "Dine In") {
          const dineIn = [
            value[0].value,
            value[1].value,
            "Y",
            "Monday",
            value[13].value,
            fifteenMinSub(value[14].value),
            value[value.length - 3].value,
            "\n",
            "",
            value[1].value,
            "Y",
            "Tuesday",
            value[15].value,
            fifteenMinSub(value[16].value),
            "",
            "\n",
            "",
            value[1].value,
            "Y",
            "Wednesday",
            value[17].value,
            fifteenMinSub(value[18].value),
            "",
            "\n",
            "",
            value[1].value,
            "Y",
            "Thursday",
            value[19].value,
            fifteenMinSub(value[20].value),
            "",
            "\n",
            "",
            value[1].value,
            "Y",
            "Friday",
            value[21].value,
            fifteenMinSub(value[22].value),
            "",
            "\n",
            "",
            value[1].value,
            "Y",
            "Saturday",
            value[23].value,
            fifteenMinSub(value[24].value),
            "",
            "\n",
            "",
            value[1].value,
            "Y",
            "Sunday",
            value[25].value,
            fifteenMinSub(value[26].value),
            " ",
            "\n",
          ];
          mlHours.push(dineIn);
          return dineIn;
        }
      }
    });
  });
  return mlHours;
}

module.exports = { menulogWriter, mlHeader };
