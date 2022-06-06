// src data format
// [1650418200000, 202204200930, 261, 177,  179],
// [timestamp (Unix time in milliseconds), datetime, up, stale, down]

export default function processData(src) {
  const result = {};
  result['plotbandDates'] = plotbandDates(src);

  const datetime = src.map((val) => {
    let unixStr = val[0].toString();
    // May 05 11:20
    let displayFmt = moment(parseInt(unixStr)).format('MMM, DD hh:mm');
    return displayFmt;
  });
  result['datetime'] = datetime;

  const threeSum = src.map((val) => val[2] + val[3] + val[4]);

  const up = src.map((val) => val[2]); //
  const upDivideBySum = up.map((n, i) => (n / threeSum[i]) * 100);
  result['upDivideBySum'] = upDivideBySum;

  const noChange = src.map((val) => val[3]);
  const noChangeDivideBySum = noChange.map((n, i) => (n / threeSum[i]) * 100);
  result['noChangeDivideBySum'] = noChangeDivideBySum;

  const down = src.map((val) => val[4]);
  const downDivideBySum = down.map((n, i) => (n / threeSum[i]) * 100);
  result['downDivideBySum'] = downDivideBySum;

  return result;
}

function dateRange(startDate, endDate, steps = 1) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }
  return dateArray;
}

// https://www.highcharts.com/forum/viewtopic.php?t=17063
// https://jsfiddle.net/Fusher/DTUdd/
function plotbandDates(src) {
  const plotBands = [];

  let firstDate = moment(src[0][0]).format('YYYY-MM-DD');
  // console.log('firstDate: ' + firstDate);
  let lastDate = moment(src[src.length - 1][0]).format('YYYY-MM-DD');
  // console.log('lastDate: ' + lastDate);
  let dateArr = dateRange(firstDate.toString(), lastDate.toString());
  var plotBandColor = '#FFFFFF';
  dateArr.forEach((day, index) => {
    // TODO plotband color alternates between gray and white
    const grayColor = 'rgb(230, 235, 245, 0.6)';
    const whiteColor = 'rgb(255, 255, 255, 0.85)';
    plotBandColor = plotBandColor == grayColor ? whiteColor : grayColor;
    plotBands.push({
      color: plotBandColor,
      from: index * 331,
      to: (index*331)+330,
      low: '0%',
      high: '100%',
      zIndex: 5,
    });
    plotBandColor = plotBands[index]['color'];
  });
  return plotBands;
}