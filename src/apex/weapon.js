const utils = require('../utils');

// const apexWeaponTypes = ['Assault', 'Sub Machine', 'Light Machine', 'Marksman', 'Sniper', 'Shotgun', 'Pistol'];
const apexWeaponsByType = {
  Assault: ['HAVOC Rifle', 'VK-47 Flatline', 'Hemlok Burst AR', 'R-301 Carbine'],
  'Sub Machine': ['Alternator SMG', 'Prowler Burst PDW', 'R-99 SMG', 'Volt SMG', 'C.A.R. SMG'],
  'Light Machine': ['Devotion LMG', 'L-STAR EMG', 'M600 Spitfire', 'Rampage LMG'],
  Marksman: ['G7 Scout', 'Triple Take', '30-30 Repeater', 'Bocek Compound Bow'],
  Sniper: ['Charge Rifle', 'Longbow DMR', 'Kraber .50-Cal Sniper', 'Sentinel'],
  Shotgun: ['EVA-8 Auto', 'Mastiff Shotgun', 'Mozambique Shotgun', 'Peacekeeper'],
  Pistol: ['RE-45 Auto', 'P2020', 'Wingman']
};
const apexWeaponTypes = Object.keys(apexWeaponsByType);

const randomWeaponType = function() {
  const num = utils.randomNumber(0, apexWeaponTypes.length) - 1;
  const apexWeaponType = apexWeaponTypes[num];

  return `Selected ${apexWeaponType}! Weapons of type ${apexWeaponType}: \`${apexWeaponsByType[apexWeaponType].join(', ')}\``;
};

const apexWeaponsByAmmo = {
  Light: ['R-301 Carbine', 'Alternator SMG', 'R-99 SMG', 'P2020', 'C.A.R. SMG', 'G7 Scout', 'M600 Spitfire'],
  Heavy: ['VK-47 Flatline', 'Hemlok Burst AR', 'Prowler Burst PDW', '30-30 Repeater', 'C.A.R. SMG'],
  Energy: ['Volt SMG', 'HAVOC Rifle', 'Devotion LMG', 'L-STAR EMG', 'Triple Take'],
  Shotgun: ['Mastiff Shotgun', 'EVA-8 Auto', 'Mozambique Shotgun', 'Peacekeeper'],
  Sniper: ['Charge Rifle', 'Longbow DMR', 'Sentinel', 'Wingman'],
  // Arrows: ['Bocek Compound Bow'], //TODO: un-comment when bow returns to floor
  Red: ['Kraber .50-Cal Sniper', 'RE-45 Auto', 'Bocek Compound Bow', 'Rampage LMG']
};
const apexAmmoTypes = Object.keys(apexWeaponsByAmmo);

const randomWeaponAmmo = function() {
  const num = utils.randomNumber(0, apexAmmoTypes.length) - 1;
  const apexWeaponAmmo = apexAmmoTypes[num];

  return `Selected ${apexWeaponAmmo}! Weapons of ammo type ${apexWeaponAmmo}: \`${apexWeaponsByAmmo[apexWeaponAmmo].join(', ')}\``;
};

const apexWeaponList = [];
for (const type in apexWeaponsByType) {
  apexWeaponList.push(...apexWeaponsByType[type]);
}

const randomWeapon = function() {
  const num = utils.randomNumber(0, apexWeaponList.length) - 1;
  return apexWeaponList[num];
};

const grenades = ['Arc Star', 'Frag Grenade', 'Thermite Grenade'];
const randomGrenade = function() {
  const num = utils.randomNumber(0, grenades.length) - 1;
  return grenades[num];
};

module.exports = {
  randomWeaponType,
  randomWeaponAmmo,
  randomWeapon,
  randomGrenade
};
