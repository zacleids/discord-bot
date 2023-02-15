require('dotenv').config();

const Discord = require('discord.js');

const utils = require('./src/utils');

// commands
const apexLegendCommands = require('./src/apex/legend');
const apexMapCommands = require('./src/apex/map');
const apexWeaponCommands = require('./src/apex/weapon');
const wheelOfApex = require('./src/apex/wheel_of_apex');
const coinCommands = require('./src/coin');
const eightBallCommands = require('./src/eightBall');
const diceCommands = require('./src/dice');

// https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js

const prefix = '!';

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

client.on('messageCreate', handleMessage);

async function handleMessage(message) {
  console.log(message);

  if (message.author.bot) {return;}
  if (!message.content.startsWith(prefix)) {return;}

  // const user = message.author.username;
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  let res = undefined;

  try {

    switch (command) {
      case 'ping':
        res = ping();
        break;
      case 'command':
      case 'commands':
        res = commands();
        break;
      case 'rules':
        res = rules();
        break;
      case 'apex_night':
        res = apexNight();
        break;
      case 'double_apex_night':
      case '2_apex_night':
        res = doubleApexNight();
        break;
      case 'r_legend':
      case 'rand_legend':
      case 'random_legend':
        res = apexLegendCommands.randomLegend();
        break;
      case 'r_class':
      case 'rand_class':
      case 'random_class':
        res = apexLegendCommands.randomClass();
        break;
      case 'r_team':
      case 'rand_team':
      case 'random_team':
        res = apexLegendCommands.randomTeam();
        break;
      case 'r_team_balanced':
      case 'rand_team_balanced':
      case 'random_team_balanced':
      case 'r_team_b':
      case 'rand_team_b':
      case 'random_team_b':
        res = apexLegendCommands.randomTeamBalanced();
        break;
      case 'r_weapon':
      case 'rand_weapon':
      case 'random_weapon':
        res = apexWeaponCommands.randomWeapon();
        break;
      case 'r_ammo':
      case 'rand_ammo':
      case 'random_ammo':
        res = apexWeaponCommands.randomWeaponAmmo();
        break;
      case 'r_weapon_type':
      case 'rand_weapon_type':
      case 'random_weapon_type':
        res = apexWeaponCommands.randomWeaponType();
        break;
      case 'r_grenade':
      case 'rand_grenade':
      case 'random_grenade':
        res = apexWeaponCommands.randomGrenade();
        break;
      case 'off_the_grid':
        res = offTheGrid();
        break;
      case 'off_the_grid_uwu':
      case 'off_the_gwid':
        res = offTheGridUwu();
        break;
      case 'r':
      case 'roll':
      case 'dice':
        res = diceCommands.diceRollCommand(args);
        break;
      case 'flip':
      case 'coin':
      case 'coin_flip':
        res = coinCommands.coinFlip();
        break;
      case 'flip_n':
      case 'coin_n':
      case 'coin_flip_n':
        res = coinCommands.coinFlipNTimes(args);
        break;
      case '8ball':
      case 'ask':
      case 'eight':
      case 'ask_eight_ball':
        res = eightBallCommands.eightBall();
        break;
      case 'spin_the_wheel':
      case 'spin_wheel':
      case 'spin':
        res = await wheelOfApex.spinTheWheel();
        break;
      case 'list_wheel':
        res = wheelOfApex.listWheel();
        break;
      case 'spin_the_wheel_nr':
      case 'spin_wheel_nr':
      case 'spin_nr':
      case 'spinnr':
        res = await wheelOfApex.spinTheWheelNoReplacement();
        break;
      case 'list_wheel_nr':
      case 'list_nr':
        res = wheelOfApex.listWheelNoReplacement();
        break;
      case 'list_poi':
      case 'l_poi':
        res = await apexMapCommands.getPoiList(args);
        break;
      case 'random_poi':
      case 'rand_poi':
      case 'r_poi':
        res = await apexMapCommands.getRandomPoi(args);
        break;
    }
  } catch (e) {
    res = e.message || e;
  }

  if (res) {
    message.reply(res);
  }
}

const ping = function(message) {
  const timeTaken = Date.now() - message.createdTimestamp;
  return `Pong! This message had a latency of ${timeTaken}ms.`;
};

const commands = function() {
  return `
!apex_night - roll a d3 to determine which player rotates out
!double_apex_night/!2_apex_night - Roll a d3 twice to determine which two players rotate out
!random_legend - pick a random legend
!random_class - pick a random character class. 'Offensive', 'Defensive', 'Recon', or 'Support'
!random_team - pick a random team of 3 legends
!random_weapon - pick a random weapon
!random_ammo - pick a random ammo type Sniper, Heavy, Energy, etc.
!random_weapon_type - pick a random weapon type Sub Machine, Sniper, Marksman, etc.
!random_grenade - pick a random grenade. 'Arc Star', 'Frag Grenade', 'Thermite Grenade'
!off_the_grid - learn about cryptos passive idea
!off_the_grid_uwu/!off_the_gwid - weawn abouwt cwyptos passive idea
!commands - see a list of the commands
!rules - see the apex constitution rules
!r/!roll/!dice - roll some dice i.e. 2d6, 1d20 + 3
!spin/!spin_the_wheel - Spins the Wheel of Apex, generating a random game modification. 
!list_wheel - Lists the different modifications in the Wheel of Apex.
!spin_the_wheel_nr/!spin_wheel_nr/!spin_nr/!spinnr: Spins the Wheel of Apex, generating a random game modification without replacement so that repeats do not occur until the list has been emptied. 
!list_wheel_nr/!list_nr - Lists remaining modifications in the No Replacement Wheel of Apex.
!list_poi/!l_poi - Lists the points of interest on a given map (can pass in the map like \`!l_poi kings canyon\`). You can also us the map initials
!random_poi - Pick a random point of interest on a given map (can pass in the map like \`!r_poi kings canyon\`). If no map is provided it'll use the current map in rotation

any command that has the word 'random' can also use 'rand' or 'r' instead
  `;
};

const apexNight = function() {
  const num = utils.randomNumber(0, 3);
  switch (num) {
    case 1:
      return 'Rolled a 1!\nThe Highest player rotates out!';
    case 2:
      return 'Rolled a 2!\nThe Middle player rotates out!';
    case 3:
      return 'Rolled a 3!\nThe lowest player rotates out!';
  }
};

const doubleApexNight = function() {
  const num = utils.randomNumber(0, 3);
  switch (num) {
    case 1:
      return 'Rolled a 2 and 3!\nThe Middle and Lowest player rotates out!';
    case 2:
      return 'Rolled a 1 and 3!\nThe Highest and Lowest player rotates out!';
    case 3:
      return 'Rolled a 1 and 2!\nThe Highest and Middle player rotates out!';
  }
};


const offTheGrid = function() {
  return 'ok so I got this idea for a crypto buff called "off the grid". What it does is that he wont get scanned by enemy scans and he wont be revealed to enemies because he will have this passive called off the grid which will protect him from enemy scans so when he gets scanned he technically doesnt get scanned because he will have off the grid passive that will protect him from the scans and since he is hacker I think he should have it have to protect him from enemy scans and I would call it off the grid and it would be his passive that would make him unscannable by enemy scans because it would be his passive and it would be called off the grid so when he gets scanned the enemies wont see him because he will have the passive ability that will protect him from the scans I believe crypto should have this ability because there is seer and respawn wont delete him so I believe they should at least give crypto ability that will make him completely immune to seer and bloodhound abilities and call it off the grid (thats the off the grid passive I was talking about)';
};

const offTheGridUwu = function() {
  return 'ok so i got thiws idea fow a cwypto buff cawwed "off the gwid". Whawt iwt does iws thawt he wont get scanned by enemy scans awnd he wont be weveawed tuwu enemies because he wiww have thiws passive cawwed off the gwid which wiww pwotect him fwom enemy scans so whewn he gets scanned he technicawwy doesnt get scanned because he wiww have off the gwid passive thawt wiww pwotect him fwom the scans awnd since he iws hackew i think he shouwd have iwt have tuwu pwotect him fwom enemy scans awnd i wouwd caww iwt off the gwid awnd iwt wouwd be hiws passive thawt wouwd make him unscannabwe by enemy scans because iwt wouwd be hiws passive awnd iwt wouwd be cawwed off the gwid so whewn he gets scanned the enemies wont see him because he wiww have the passive abiwity thawt wiww pwotect him fwom the scans i bewieve cwypto shouwd have thiws abiwity because thewe iws seew awnd wespawn wont dewete him so i bewieve they shouwd at weast give cwypto abiwity thawt wiww make him compwetewy immune tuwu seew awnd bwoodhound abiwities awnd caww iwt off the gwid (thats the off the gwid passive i was tawking abouwt)';
};

const rules = function() {
  return `
**TL;DR**
~~The player with the highest number of kills in a match rotates with the player next in queue~~ Use **AMENDMENT 6**
If two players tie for highest kills, then the player with the most kills and the most damage rotates
Games count if squad survives the first POI
Party must rotate for the third dead-on-landing game
Normal rotation rules apply
Player to win game as kill leader of the group may amend THE APEX CONSTITUTION OF THE RULES TO ROTATE to add or change a single rule.


**AMENDMENTS**
*AMENDMENT 1*: On an individual basis, each player must choose an unusual legend or a legend that one would not normally choose for their first game of the session. (LUP3N)
*AMENDMENT 2*: First match of a session players must hold onto the first shotgun they come across
*AMENDMENT 3*: First time rotation would occur, the rotating player chooses an ammo type; players in the next match must carry a gun of that ammo type to the end of that game
*AMENDMENT 4*: If a player is killed by a Bangalore, they have to speak like Bangalore during their next match.
*AMENDMENT 5*: Whenever every player scores less than 100 damage in a round, the next round will be a Gun Game. Gun Game: After every kill, you must swap one of your guns. 
*AMENDMENT 6*: At the beginning of each session of play, one of the players will roll a d3. If a 1, the player with the highest kills and damage rotates as normal; if a 2, the player with the second highest rotates instead; if a 3, the player with the third highest rotates. You can use the \`!apex_night\` command
*AMENDMENT 7*: Amends AMENDMENT 4, replacing Bangalore with Horizon
*AMENDMENT 8*: If one or more players get three or more kills in a match, the next game is a Grenade Game. Grenade Game: Each player must collect as many grenades as they can, and they must use all of their grenades before using their guns. 
*AMENDMENT 9*: If you end a game with a damage that is a multiple of 10, you must use the \`!random_legend\` command to select your next legend (keep re-running the command until it selects a legend you own).
*AMENDMENT 10*: Amends AMENDMENT 7, reverting Horizon back to Bangalore
*AMENDMENT 11*: Amends AMENDMENT 10, replacing Bangalore with Mirage

`;
};

client.login(process.env.BOT_TOKEN);

console.log('Bot running!');
