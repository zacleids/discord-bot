/**
 *
 * @param {string} val
 * @return {boolean}
 */
function isNumeric(val) {
  return /^-?\d+$/.test(val);
}

/**
 * A function to return a random boolean with 50/50 odds
 * @return {boolean}
 */
function randomBoolean() {
  return Math.random() < 0.5;
}
/**
 * Will give a random number between min and max, exclusive of min and including max
 * ie. randomNumber(0,4) can return one of 1, 2, 3, 4
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min + 1;
}

/**
 *
 * @param {number} num
 * @param {number} lowerBound
 * @param {number} upperBound
 * @returns {boolean}
 */
function rangeValidator(num, lowerBound, upperBound) {
  return ((num >= lowerBound) && (num <= upperBound));
}

/**
 * Picks a random item based on its weight.
 * The items with higher weights will be picked more often (with a higher probability).
 * Copied and modified from https://dev.to/trekhleb/weighted-random-algorithm-in-javascript-1pdc
 *
 * @param {Object[]} itemsAndWeights
 * @param {any} itemsAndWeights.item
 * @param {number} itemsAndWeights.weight
 * @returns {any} the item selected
 */
function weightedRandom(itemsAndWeights) {
  if (!itemsAndWeights.length) {
    throw new Error('Items must not be empty');
  }

  const weights = itemsAndWeights.map((i) => i.weight);

  // Preparing the cumulative weights array.
  // For example:
  // - weights = [1, 4, 3]
  // - cumulativeWeights = [1, 5, 8]
  const cumulativeWeights = [];
  for (let i = 0; i < weights.length; i++) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  // Getting the random number in a range of [0...sum(weights)]
  // For example:
  // - weights = [1, 4, 3]
  // - maxCumulativeWeight = 8
  // - range for the random number is [0...8]
  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = maxCumulativeWeight * Math.random();

  // Picking the random item based on its weight.
  // The items with higher weight will be picked more often.
  for (let itemIndex = 0; itemIndex < itemsAndWeights.length; itemIndex += 1) {
    if (cumulativeWeights[itemIndex] >= randomNumber) {
      return itemsAndWeights[itemIndex].item;
    }
  }
}


module.exports = {
  isNumeric,
  randomBoolean,
  randomNumber,
  rangeValidator,
  weightedRandom
};
