const mlHeader = [
  "Store Number",
  "Restaurant",
  "Menulog",
  "Day",
  "Open",
  "Close",
  "Effective Date"
  ,"\n"
];

//templating function

function menulogWriter(data, isMenulog) {
  return [].concat(
    ...data.map((value) => {
      if (value[8].value === "Drive Thru") {
        const driveT = [
           value[0].value,
          value[1].value,
          "Y",
          "Monday",
          value[27].value,
          value[28].value,
          value[value.length - 3].value,
          "\n",
          "",
          value[1].value,
          "Y",
          "Tuesday",
          value[29].value,
          value[30].value,
          "",
          "\n",
          "",
          value[1].value,
          "Y",
          "Wednesday",
          value[31].value,
          value[32].value,
          "",
          "\n",
          "",
          value[1].value,
          "Y",
          "Thursday",
          value[33].value,
          value[34].value,
          "",
          "\n",
          "",
          value[1].value,
          "Y",
          "Friday",
          value[35].value,
          value[36].value,
          "",
          "\n",
          "",
          value[1].value,
          "Y",
          "Saturday",
          value[37].value,
          value[38].value,
          "",
          "\n",
          "",
          value[1].value,
          "Y",
          "Sunday",
          value[39].value,
          value[40].value,
          "",
          "\n"
        ];
        return driveT;
      }

      if (value[8].value === "Dine In") {
        const dineIn = [
          value[0].value,
          value[1].value,
          "Y",
          "Monday",
          value[13].value,
          value[14].value,
          value[value.length - 3].value,
          "\n",
          "",
          value[1].value,
          "Y",
          "Tuesday",
          value[15].value,
          value[16].value,
          "",
          "\n",
          "",
          value[1].value,
          "Y",
          "Wednesday",
          value[17].value,
          value[18].value,
          "",
          "\n",
          "",
          value[1].value,
          "Y",
          "Thursday",
          value[19].value,
          value[20].value,
          "",
          "\n",
          "",
          value[1].value,
          "Y",
          "Friday",
          value[21].value,
          value[22].value,
          "",
          "\n",
          "",
          value[1].value,
          "Y",
          "Saturday",
          value[23].value,
          value[24].value,
          "",
          "\n",
          "",
          value[1].value,
          "Y",
          "Sunday",
          value[25].value,
          value[26].value,
          "",
          "\n"
        ];
        return dineIn;
      }
    })
  );
}

module.exports = { menulogWriter, mlHeader };
