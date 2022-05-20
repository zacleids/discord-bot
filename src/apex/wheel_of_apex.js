const utils = require('../utils');

const apexGameModifications =
    [
      'Spin twice and do Both! (If this is rolled again, Ignore and reroll)',
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
      'Switch loadouts with the people you kill. (Player who gets the kill credit)'
    ];

const spinTheWheel = function() {
  const num = utils.randomNumber(0, apexGameModifications.length) - 1;
  return apexGameModifications[num];
};


const listWheel = function() {
  let listFormatted = '';
  let i = 1;
  for (const modification of apexGameModifications) {
    listFormatted += ((i++) + ': ');
    listFormatted += modification;
    listFormatted += '\n';
  }
  return listFormatted;
};

module.exports = {
  spinTheWheel,
  listWheel
};
