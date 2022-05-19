const utils = require('./utils');
const _ = require('lodash');


/**
 *
 * @param {string[]} args - the args passed to the command i.e. 1d8 + 3
 * @returns {string}
 */
const diceRollCommand = function(args) {

  if (args.length === 0) {
    return 'Invalid input. please use !r {num}d{num} ie. \`!r 1d20\`';
  }
  const diceRegex = /\d+d\d+/;
  const numberRegex = /\d+/;
  const plusRegex = /\+/;
  const negativeRegex = /-/;

  let negativeModifierOnNextNum = false;

  const rolls = [];

  for (const arg of args) {
    if (diceRegex.test(arg)) {
      try {
        rolls.push(rollDice(arg, negativeModifierOnNextNum));
        if (negativeModifierOnNextNum) {
          negativeModifierOnNextNum = false;
        }
      } catch (e) {
        return e.message;
      }
    } else if (numberRegex.test(arg)) {
      const num = parseInt(arg);
      rolls.push([negativeModifierOnNextNum ? num * -1 : num]);
      if (negativeModifierOnNextNum) {
        negativeModifierOnNextNum = false;
      }
    } else if (plusRegex.test(arg)) {
      // noop
    } else if (negativeRegex.test(arg)) {
      negativeModifierOnNextNum = true;
    } else {
      return `Invalid arg ${arg}`;
    }
  }

  const flattenedRolls = _.flatten(rolls);
  const sum = _.sum(flattenedRolls);

  if (flattenedRolls.length === 1) {
    return sum.toString();
  }

  const formattedRolls = [];
  for (const roll of rolls) {
    formattedRolls.push(rollFormat(roll));
  }

  return `${formattedRolls.join(' + ')} = ${sum}`;
};

/**
 *
 * @param {number[]} roll
 * @returns {string|number}
 */
const rollFormat = function(roll) {
  if (roll.length === 1) {
    return roll[0];
  }

  return `(${roll.join(' + ')})`;
};

/**
 *
 * @param {string} dice - a dice roll arg i.e. 3d8
 * @param {boolean} negativeModifier - should rolls be negative
 * @returns {number[]}
 */
const rollDice = function(dice, negativeModifier = false) {
  const splitArg = dice.split('d');
  const numDice = parseInt(splitArg[0]);
  const numSides = parseInt(splitArg[1]);

  const diceLowerBound = 1;
  const diceUpperBound = 100;

  if (!utils.rangeValidator(numDice, diceLowerBound, diceUpperBound)) {
    throw new Error(`I'm sorry, number of dice are out of range. Please provide number of dices in the range [${diceLowerBound}, ${diceUpperBound}]. Maybe Pathfinder could do it, I hear he's a legend!`);
  }

  const sidesLowerBound = 2;
  const sidesUpperBound = 1000;

  if (!utils.rangeValidator(numSides, sidesLowerBound, sidesUpperBound)) {
    throw new Error(`I'm sorry, number of sides of a dice are out of range. Please provide number of sides of a dice in the range [${sidesLowerBound}, ${sidesUpperBound}]. Maybe Pathfinder could do it, I hear he's a legend!`);
  }

  const rolls = [];
  for (let i = 0; i < numDice; i++) {
    let roll = utils.randomNumber(0, numSides);
    if (negativeModifier) {
      roll *= -1;
    }
    rolls.push(roll);
  }

  return rolls;
};

module.exports = {
  diceRollCommand
};
