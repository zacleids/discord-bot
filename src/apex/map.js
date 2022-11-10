const apexApi = require('./api');
const utils = require('../utils');

const MAP_INFO = {
  'Kings Canyon': [
    'Spotted Lake',
    'Runoff',
    'Airbase',
    'Gauntlet (Octane Town Takeover)',
    'The Pit',
    'Bunker',
    'Relic',
    'Market',
    'Caustic Treatment (Caustic Town Takeover)',
    'Map Room (Crypto Town Takeover)',
    'Repulsor',
    'Hydro Dam',
    'The Cage',
    'Containment',
    'Crash Site',
    'Artillery',
    'Labs (Wraith Town Takeover)',
    'Swamps',
    'Capacitor',
    'The Rig',
    'Basin'
  ],
  Olympus: [
    'Docks',
    'Carrier',
    'Oasis',
    'Fight Night (Pathfinder Town Takeover)',
    'Estates',
    'Elysium',
    'Hydroponics',
    'Turbine',
    'Power Grid',
    'Energy Depot',
    'Rift',
    'Gardens',
    'Grow Tower',
    'Hammond Labs',
    'Terminal',
    'Phase Driver',
    'Bonsai Plaza',
    'Solar Array',
    'Icarus',
    'Orbital Cannon'
  ],
  'Storm Point': [
    'North Pad',
    'Checkpoint',
    'Downed Beast',
    'The Mill',
    'Cenote Cave',
    'Barometer',
    'Ship Fall',
    'Gale Station',
    'Antenna',
    'Fish Farms',
    'Launch Pad',
    'Storm Catcher',
    'Cascade Falls',
    'Command Center',
    'The Wall',
    'Highpoint',
    'Lightning Rod',
    'Thunder Watch'
  ],
  'Worlds Edge': [
    'Trials (Bloodhound Town Takeover)',
    'Skyhook',
    'Countdown',
    'Lava Fissure',
    'Landslide',
    'Staging',
    'Harvester',
    'Thermal Station',
    'The Tree',
    'Lava Siphon',
    'Launch Site',
    'The Dome',
    'Lava City',
    'Big Maude (Rampart Town Takeover)',
    'The Geyser',
    'Fragment East',
    'Fragment West',
    'Overlook',
    'The Epicenter',
    'Survey Camp',
    'Climatizer'
  ],
  'Broken Moon': [
    'Breaker Wharf',
    'The Core',
    'Alpha Base',
    'Backup Atmo',
    'Dry Gulch',
    'Stasis Array',
    'Eternal Gardens',
    'Production Yard',
    'South Promenade',
    'North Promenade',
    'The Divide',
    'Terraformer',
    'The Foundry',
    'Cultivation',
    'Atmostation',
    'Bionomics'
  ]
};

class Map {

  /**
   *
   * @param {string} name
   * @param {string[]} poiList
   */
  constructor(name, poiList) {
    this.name = name;
    this.poiList = poiList;
  }

  getName() {
    return this.name;
  }

  getPoiList() {
    return this.getName() + ':\n' + this.poiList.join('\n');
  }

  getRandomPoi() {
    const num = utils.randomNumber(0, this.poiList.length) - 1;
    return this.getName() + ': ' + this.poiList[num];
  }
}

class MapCommands {

  constructor() {
    this.kingsCanyonMap = new Map('Kings Canyon', MAP_INFO['Kings Canyon']);
    this.olympusMap = new Map('Olympus', MAP_INFO['Olympus']);
    this.stormPointMap = new Map('Storm Point', MAP_INFO['Storm Point']);
    this.worldsEdgeMap = new Map('Worlds Edge', MAP_INFO['Worlds Edge']);
    this.brokenMoonMap = new Map('Broken Moon', MAP_INFO['Broken Moon']);

    this.nameMappings = {
      // Kings Canyon
      k: this.kingsCanyonMap,
      kc: this.kingsCanyonMap,
      king: this.kingsCanyonMap,
      'kings canyon': this.kingsCanyonMap,
      'king\'s canyon': this.kingsCanyonMap,

      // Olympus
      o: this.olympusMap,
      olympus: this.olympusMap,

      // Storm Point
      s: this.stormPointMap,
      sp: this.stormPointMap,
      storm: this.stormPointMap,
      'storm point': this.stormPointMap,

      // Worlds Edge
      w: this.worldsEdgeMap,
      we: this.worldsEdgeMap,
      world: this.worldsEdgeMap,
      'worlds edge': this.worldsEdgeMap,
      'world\'s edge': this.worldsEdgeMap,

      // Broken Moon
      b: this.brokenMoonMap,
      bm: this.brokenMoonMap,
      broken: this.brokenMoonMap,
      'broken moon': this.brokenMoonMap
    };
  }

  /**
   *
   * @param {string[]} args
   * @return {Promise<string>}
   */
  async parseMapArgs(args = []) {
    if (args.length === 0) {
      const map = await apexApi.getCurrentMap();
      args.push(map);
    }

    const map = args.join(' ').toLowerCase();

    if (!Object.keys(this.nameMappings).includes(map)) {
      throw new Error('Invalid map: ' + map);
    }

    return map;
  }

  /**
   *
   * @param {string[]} args
   * @return {Promise<string>}
   */
  async getPoiList(args) {
    const map = await this.parseMapArgs(args);

    return this.nameMappings[map].getPoiList();
  }

  /**
   *
   * @param {string[]} args
   * @return {Promise<string>}
   */
  async getRandomPoi(args) {
    const map = await this.parseMapArgs(args);

    return this.nameMappings[map].getRandomPoi();
  }

}

const mapCommands = new MapCommands();
module.exports = mapCommands;
