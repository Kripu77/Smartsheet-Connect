function converToMinutes(s) {
 let c = s.split(":");
  return parseInt(c[0]) * 60 + parseInt(c[1]);
}

function parseTime(s) {
  return Math.floor(parseInt(s) / 60) + ":" + (parseInt(s) % 60);
}

function fifteenMinSub(closeHour) {
  let timeToSubtract = 15;
  let startTime = converToMinutes(closeHour==='0:00'?'24:00':closeHour );
  let converted = parseTime(startTime - timeToSubtract);
  return converted;
}


module.exports = { fifteenMinSub };
