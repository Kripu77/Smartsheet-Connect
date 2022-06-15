const { uberDataPrep } = require("../utils/uberPrepper");

const uberHeader = [
  "Store UUID",
  "Menu",
  "Overwrite Existing Hours",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday\n",
];

//main fn

function uberWriter(data, isUber) {
  return [].concat(
    ...data.map((value) => {
      if (value[8].value === "Drive Thru") {
        const driveT = [
          "Uber ID Here",

          "MENU",
          "TRUE",
          uberDataPrep(value[40].value),
          uberDataPrep(value[28].value),
          uberDataPrep(value[30].value),
          uberDataPrep(value[32].value),
          uberDataPrep(value[34].value),
          uberDataPrep(value[36].value),
          uberDataPrep(value[38].value),

          "\n",
          "Uber ID here",
          "Breakfast",
          "TRUE",
          `${value[39].value}-10:45`,
          `${value[27].value}-10:45`,
          `${value[29].value}-10:45`,
          `${value[31].value}-10:45`,
          `${value[33].value}-10:45`,
          `${value[35].value}-10:45`,
          `${value[37].value}-10:45`,

          "\n",
        ];
        return driveT;
      }

      if (value[8].value === "Dine In") {
        const dineIn = [
          "uber ID Here",
          "MENU",
          "TRUE",
          uberDataPrep(value[26].value),
            uberDataPrep(value[14].value),
          uberDataPrep(value[16].value),
          uberDataPrep(value[18].value),
          uberDataPrep(value[20].value),
          uberDataPrep(value[22].value),
          uberDataPrep(value[24].value),

          "\n",
          "Uber ID here",
          "Breakfast",
          "TRUE",
          `${value[25].value}-10:45`,
          `${value[13].value}-10:45`,
          `${value[15].value}-10:45`,
          `${value[17].value}-10:45`,
          `${value[19].value}-10:45`,
          `${value[21].value}-10:45`,
          `${value[23].value}-10:45`,

          "\n",
        ];
        return dineIn;
      }
    })
  );
}

module.exports = { uberHeader, uberWriter };
