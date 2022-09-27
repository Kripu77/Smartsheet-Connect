
// main clean sheet provider fn

const sheetHeader = [
  [
    "Store Number",
    "Restaurant",
    "State",
    "Day",
    "Store Type",
    "Dine In Open",
    "Dine In Close",
    "Drive Thru Open",
    "Drive Thru Close",
    "Effective Date\n",
  ],
];

function sheetPrep(data) {
  let cleansedData = [];
  data.map((value) => {
    const allData = [
      value[0].value,
      value[1].value,
      value[5].value,
      value[8].value,
      "Monday",
      value[13].value,
      value[14].value,
      value[27].value,
      value[28].value,
      value[value.length - 3].value,
      "\n",
      value[1].value,
      value[5].value,
      value[8].value,
      "Tuesday",
      value[15].value,
      value[16].value,
      value[29].value,
      value[30].value,
      "\n",
      value[1].value,
      value[5].value,
      value[8].value,
      "Wednesday",
      value[17].value,
      value[18].value,
      value[31].value,
      value[32].value,
      "\n",
      value[1].value,
      value[5].value,
      value[8].value,
      "Thursday",
      value[19].value,
      value[20].value,
      value[33].value,
      value[34].value,
      "\n",
      value[1].value,
      value[5].value,
      value[8].value,
      "Friday",
      value[21].value,
      value[22].value,
      value[35].value,
      value[36].value,
      "\n",
      value[1].value,
      value[5].value,
      value[8].value,
      "Saturday",
      value[23].value,
      value[24].value,
      value[37].value,
      value[38].value,
      "\n",
      value[1].value,
      value[5].value,
      value[8].value,
      "Sunday",
      value[25].value,
      value[26].value,
      value[39].value,
      value[40].value,
      "\n",
    ];

    cleansedData.push(allData);
  });
  return cleansedData;
}

module.exports = { sheetPrep, sheetHeader };
