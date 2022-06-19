

//2D array to 1DArray Converter fn
function arrayJoine(twoDarray) {
  let output = twoDarray
    .map((singleArr) => {
      return singleArr.join(",");
    })
    .join("");

  return output;
}

//AOO to AOA to 1DArray converter fn
function objectConverter(input) {
  let outputData = arrayTwo.map(Object.values);
  outputData = arrayJoine(outputData)
  return outputData;
}

module.exports = { arrayJoine };
