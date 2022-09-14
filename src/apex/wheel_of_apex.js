const _ = require('lodash');

const utils = require('../utils');
const apexWeaponCommands = require('./weapon');
const apexLegendCommands = require('./legend');

class WheelCommand {
  /**
   *
   * @param {string} text - the text to display
   * @param {function} [func] - an optional function to run with the command
   */
  constructor(text, func) {
    this.text = text;
    this.func = func;
  }

  getText() {
    return this.text;
  }

  run() {
    let res = this.text;

    if (_.isFunction(this.func)) {
      res += '\n' + this.func();
    }

    return res;
  }
}

class Wheel {

  constructor() {
    this.apexGameModifications =
      [
        new WheelCommand('Spin twice and do Both!\n', this.spinTheWheelTwice.bind(this)),
        new WheelCommand('On an individual basis, each player must choose an unusual legend or a legend that one would not normally choose.'),
        new WheelCommand('A random gun type is selected. Players must hold onto the first of that gun they come across (!random_weapon_type)', apexWeaponCommands.randomWeaponType),
        new WheelCommand('A Random Ammo Type is Chosen, players in the must carry a gun of that ammo type to the end of that game (!random_ammo)', apexWeaponCommands.randomWeaponAmmo),
        new WheelCommand('Players must speak like their chosen legend during the game'),
        new WheelCommand('After every kill, you must swap one of your guns.'),
        new WheelCommand('Each player must collect as many grenades as they can, and they must use all of their grenades before using their guns.'),
        new WheelCommand('All players must randomly select a legend (!random_legend)'),
        new WheelCommand('A random team is generated. Players must play one of the generated Legends (!random_team)', apexLegendCommands.randomTeam),
        new WheelCommand('Raise Sensitivity up to 10 for one match (Remember to write down your current sensitivity!)'),
        new WheelCommand('Cannot open doors. (Kicking doors down is allowed)'),
        new WheelCommand('Must attempt a finisher after each player you knock down'),
        new WheelCommand('Have to attack everyone you see once you land, no matter what. No running from fights.'),
        new WheelCommand('Can\'t loot from deathboxes'),
        new WheelCommand('Choose between the first 5 weapons you encounter, no other weapons are allowed'),
        new WheelCommand('A person is designated as the lord. The other two members must follow the calls of the lord as well as say "yes milord." The squires must do their best to defend the lord.  The lord is designated randomly or by group agreement.')
      ];
    this.apexModificationsNoReplacement = _.clone(this.apexGameModifications);
  }

  spinTheWheel() {
    const num = utils.randomNumber(0, this.apexGameModifications.length) - 1;
    return this.apexGameModifications[num].run();
  }

  spinTheWheelTwice() {
    const listClone = _.clone(this.apexGameModifications);
    listClone.shift(); // we always know that spin twice is the 0th element
    const num1 = utils.randomNumber(0, listClone.length) - 1;
    const mod1 = listClone.splice(num1, 1)[0];
    const num2 = utils.randomNumber(0, listClone.length) - 1;
    const mod2 = listClone.splice(num2, 1)[0];
    return `${mod1.run()}\n **AND**\n${mod2.run()}`;
  }

  /**
   *
   * @param {string} header
   * @param {WheelCommand[]} arr
   * @returns {string}
   */
  formatList(header = '', arr) {
    let listFormatted = header;
    for (const [index, command] of Object.entries(arr)) {
      listFormatted += (index + 1 + ': ');
      listFormatted += command.getText();
      listFormatted += '\n';
    }
    return listFormatted;
  }

  listWheel() {
    return this.formatList('', this.apexGameModifications);
  }

  spinTheWheelNoReplacement() {
    const num = utils.randomNumber(0, this.apexModificationsNoReplacement.length) - 1;
    const modification = this.apexModificationsNoReplacement[num];
    this.apexModificationsNoReplacement.splice(num, 1);

    let preText = '';

    if (this.apexModificationsNoReplacement.length === 0) {
      preText = '[All Modifications drawn, Refilling Wheel]\n';
      this.apexModificationsNoReplacement = _.clone(this.apexGameModifications);
    }
    return preText + modification.run();
  }

  listWheelNoReplacement() {
    return this.formatList('Remaining Modifications:\n', this.apexModificationsNoReplacement);
  }
}

const wheel = new Wheel();

module.exports = wheel;
