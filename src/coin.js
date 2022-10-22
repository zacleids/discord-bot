const utils = require('./utils');


/**
 * A function to flip a coin with a 1% chance to land on its edge.
 * Landing on its edge is closer to 1/6000 in reality, but it might never be chosen in my small discord server.
 * ref: https://en.wikipedia.org/wiki/Coin_flipping#:~:text=A%20computational%20model%20suggests%20that,their%20edges%20unsupported%20if%20flipped
 *
 * @return {'Heads'|'Tails'|'Wow, it landed on its edge! Weird right?'}
 */
const coinFlip = function() {
  return utils.weightedRandom([
    { weight: 49.5, item: 'Heads' },
    { weight: 49.5, item: 'Tails' },
    { weight: 1, item: 'Wow, it landed on its edge! Weird right?' }
  ]);
};

/**
 * Flip a coin N times returning either a sequence of H and T.
 * If the number is 25 and higher than a show of counts of heads and tails is shown.
 *
 * @param {string[]} args - the args passed to the command
 * @returns {string}
 */
const coinFlipNTimes = function(args) {
  const num = parseInt(args[0]);
  // the isNumeric catches strings with scientific notation that become incorrect integers
  if (args.length !== 1 || isNaN(num) || !utils.isNumeric(args[0]) || num < 1 || num > 100000) {
    return 'Invalid input. Please enter just a positive number less than ot equal to 100000';
  }

  if (num === 1) {
    return coinFlip();
  }

  if (num < 25) {
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(utils.randomBoolean() ? 'H' : 'T');
    }
    return arr.join(''); // arr.join after a loop is faster than using string concatenation in a loop
  }

  let count = 0;
  for (let i = 0; i < num; i++) {
    if (utils.randomBoolean()) {
      count++;
    }
  }

  return `Heads: ${count}\nTails: ${num - count}`;
};

module.exports = {
  coinFlip,
  coinFlipNTimes
};
