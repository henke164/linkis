const wheel = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

function getSpinLength(from, to) {
  let steps = 0;
  var indexOfFrom = wheel.indexOf(from);

  for (let x = indexOfFrom; x < 100; x++) {
    if (x >= wheel.length) {
      x = 0;
    }

    if (wheel[x] == to) {
      break;
    } else {
      steps++;
    }
  }

  return steps;
}

function getPredictions(earlierLengths, from) {
  const predictions = [];

  if (!earlierLengths) {
    return predictions;
  }

  for (let x = 0; x < earlierLengths.length; x++) {
    predictions.push({
      number: getNumberFromSpinLength(from, earlierLengths[x].spinLength),
      color: earlierLengths[x].color
    });
  }

  return predictions;
}

function getNumberFromSpinLength(from, length) {
  let indexOfFrom = wheel.indexOf(from);
  let number = 0;
  let step = indexOfFrom;

  for (let x = indexOfFrom; x < indexOfFrom + length; x++) {
    step++;
    if (step >= wheel.length) {
      step = 0;
    }
  }

  number = wheel[step];
  return number;
}

module.exports = {
  getSpinLength,
  getPredictions,
  getNumberFromSpinLength,
};