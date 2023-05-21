const utils = require('../utils');

// const apexClasses = ['Assault', 'Skirmisher', 'Recon', 'Controller', 'Support'];
const apexLegendsCharacters = {
  Assault: ['Ash', 'Fuse', 'Mad Maggie', 'Bangalore', 'Revenant', 'Ballistic'],
  Skirmisher: ['Wraith', 'Octane', 'Horizon', 'Valkyrie', 'Pathfinder'],
  Recon: ['Bloodhound', 'Crypto', 'Seer', 'Vantage'],
  Controller: ['Caustic', 'Wattson', 'Rampart', 'Catalyst'],
  Support: ['Lifeline', 'Loba', 'Gibraltar', 'Newcastle', 'Mirage']
};
const apexClasses = Object.keys(apexLegendsCharacters);

const apexCharactersList = [].concat(apexLegendsCharacters.Assault, apexLegendsCharacters.Skirmisher, apexLegendsCharacters.Recon, apexLegendsCharacters.Controller, apexLegendsCharacters.Support);

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

const randomTeamBalanced = function() {
  const legendsObjectCopy = JSON.parse(JSON.stringify(apexLegendsCharacters));
  const apexClasses = Object.keys(legendsObjectCopy);

  const classNum1 = utils.randomNumber(0, apexClasses.length) - 1;
  const class1 = apexClasses.splice(classNum1, 1);
  const classLegends1 = legendsObjectCopy[class1];
  const legendNum1 = utils.randomNumber(0, classLegends1.length) - 1;
  const legend1 = classLegends1[legendNum1];

  const classNum2 = utils.randomNumber(0, apexClasses.length) - 1;
  const class2 = apexClasses.splice(classNum2, 1);
  const classLegends2 = legendsObjectCopy[class2];
  const legendNum2 = utils.randomNumber(0, classLegends2.length) - 1;
  const legend2 = classLegends2[legendNum2];

  const classNum3 = utils.randomNumber(0, apexClasses.length) - 1;
  const class3 = apexClasses.splice(classNum3, 1);
  const classLegends3 = legendsObjectCopy[class3];
  const legendNum3 = utils.randomNumber(0, classLegends3.length) - 1;
  const legend3 = classLegends3[legendNum3];

  return `Random Balanced Team: \`\`\`${class1}: ${legend1}\n${class2}: ${legend2}\n${class3}: ${legend3}\n\`\`\``;
};

module.exports = {
  randomLegend,
  randomClass,
  randomTeam,
  randomTeamBalanced
};
