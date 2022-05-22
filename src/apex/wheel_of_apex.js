const _ = require('lodash');

const utils = require('../utils');

const apexGameModifications =
    [
      'Spin twice and do Both!',
      'On an individual basis, each player must choose an unusual legend or a legend that one would not normally choose.',
      'A random gun type is selected. Players must hold onto the first of that gun they come across',
      'A Random Ammo Type is Chosen, players in the must carry a gun of that ammo type to the end of that game',
      'Players must speak like their chosen legend during the game',
      'After every kill, you must swap one of your guns.',
      'Each player must collect as many grenades as they can, and they must use all of their grenades before using their guns.',
      'All players must randomly select a legend',
      'A random team is generated. Players must play one of the generated Legends',
      'Raise Sensitivity up to 10 for one match (Remember to write down your current sensitivity!)',
      'Cannot open doors. (Kicking doors down is allowed)',
      'Must attempt a finisher after each player you knock down',
      'Have to attack everyone you see once you land, no matter what. No running from fights.',
      'Can\'t loot from deathboxes',
      'Choose between the first 5 weapons you encounter, no other weapons are allowed'

    ];

let apexModificationsNoReplacement = _.clone(apexGameModifications);

const spinTheWheel = function() {
  const num = utils.randomNumber(0, apexGameModifications.length) - 1;

  // double spin was selected
  if (num === 0) {
    const listClone = _.clone(apexGameModifications);
    listClone.shift();
    const num1 = utils.randomNumber(0, listClone.length) - 1;
    const mod1 = listClone.splice(num1, 1);
    const num2 = utils.randomNumber(0, listClone.length) - 1;
    const mod2 = listClone.splice(num2, 1);
    return `
${apexGameModifications[num]}\n
${mod1}
**AND**
${mod2}
    `;
  }

  return apexGameModifications[num];
};

/**
 *
 * @param {string} header
 * @param {string[]} arr
 */
const formatList = function(header = '', arr) {
  let listFormatted = header;
  let i = 1;
  for (const value of arr) {
    listFormatted += ((i++) + ': ');
    listFormatted += value;
    listFormatted += '\n';
  }
  return listFormatted;
};

const listWheel = function() {
  return formatList('', apexGameModifications);
};

const spinTheWheelNoReplacement = function() {
  const num = utils.randomNumber(0, apexModificationsNoReplacement.length) - 1;
  let modification = apexModificationsNoReplacement[num];
  apexModificationsNoReplacement.splice(num, 1);

  if (apexModificationsNoReplacement.length === 0) {
    modification += ' [All Modifications drawn, Refilling Wheel]';
    apexModificationsNoReplacement = _.clone(apexGameModifications);
  }
  return modification;
};

const listWheelNoReplacement = function() {
  return formatList('Remaining Modifications:\n', apexModificationsNoReplacement);
};

module.exports = {
  spinTheWheel,
  listWheel,
  spinTheWheelNoReplacement,
  listWheelNoReplacement
};
