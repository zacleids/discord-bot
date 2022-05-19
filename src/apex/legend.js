const utils = require('../utils');

// const apexClasses = ['Offensive', 'Defensive', 'Recon', 'Support'];
const apexLegendsCharacters = {
  Offensive: ['Bangalore', 'Wraith', 'Mirage', 'Octane', 'Revenant', 'Horizon', 'Fuse', 'Ash', 'Mad', 'Maggie'],
  Defensive: ['Gibraltar', 'Caustic', 'Wattson', 'Rampart', 'Newcastle'],
  Recon: ['Bloodhound', 'Pathfinder', 'Crypto', 'Valkyrie', 'Seer'],
  Support: ['Lifeline', 'Loba']
};
const apexClasses = Object.keys(apexLegendsCharacters);

const apexCharactersList = [].concat(apexLegendsCharacters.Offensive, apexLegendsCharacters.Defensive, apexLegendsCharacters.Recon, apexLegendsCharacters.Support);

const randomLegend = function() {
  const num = utils.randomNumber(0, apexCharactersList.length) - 1;
  return apexCharactersList[num];
};

const randomClass = function() {
  const num = utils.randomNumber(0, apexClasses.length) - 1;
  const apexClass = apexClasses[num];

  return `Selected ${apexClass}! Legends of type ${apexClass}: \`${apexLegendsCharacters[apexClass].join(', ')}\``;
};

const randomTeam = function() {
  const team = [];
  const legendsCopy = JSON.parse(JSON.stringify(apexCharactersList));

  const num1 = utils.randomNumber(0, legendsCopy.length) - 1;
  team.push(legendsCopy.splice(num1, 1));

  const num2 = utils.randomNumber(0, legendsCopy.length) - 1;
  team.push(legendsCopy.splice(num2, 1));

  const num3 = utils.randomNumber(0, legendsCopy.length) - 1;
  team.push(legendsCopy.splice(num3, 1));

  return `Random Team: \`${team.join(', ')}\``;
};

module.exports = {
  randomLegend,
  randomClass,
  randomTeam
};
