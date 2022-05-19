
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


module.exports = {
  randomNumber,
  rangeValidator
};
