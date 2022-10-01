const axios = require('axios');

/**
 * @typedef {Object} MapRotationInfo
 * @property {string} map
 * @property {string} event
 * @property {number} _index
 * @property {Object} times
 * @property {number} times.sinceStart
 * @property {number} times.next
 * @property {Object} times.remaining
 * @property {number} times.remaining.minutes
 * @property {number} times.remaining.seconds
 */

/**
 * @typedef {Object} MapApiResponse
 * @property {boolean} success
 * @property {MapRotationInfo} arenas
 * @property {MapRotationInfo} arenas.ranked
 * @property {MapRotationInfo} br
 * @property {Object} ranked
 * @property {number} ranked.split
 * @property {string} ranked.map
 * @property {number} ranked.start
 * @property {number} ranked.end
 */

// real example:
// {
//   "success": true,
//   "arenas": {
//     "map": "Habitat 4",
//     "event": "",
//     "_index": 1,
//     "times": {
//       "sinceStart": 72094.7,
//       "next": 1664390700,
//       "remaining": {
//         "minutes": 10.30000000000291,
//         "seconds": 618
//       }
//     },
//     "ranked": {
//       "map": "Overflow",
//       "event": "",
//       "_index": 2,
//       "times": {
//         "sinceStart": 72094.7,
//         "next": 1664391600,
//         "remaining": {
//           "minutes": 25.30000000000291,
//           "seconds": 1518
//         }
//       }
//     }
//   },
//   "br": {
//     "map": "Kings Canyon",
//     "event": "",
//     "_index": 3,
//     "times": {
//       "sinceStart": 67774.7,
//       "next": 1664393400,
//       "remaining": {
//         "minutes": 55.30000000000291,
//         "seconds": 3318
//       }
//     },
//     "ranked": {
//       "split": 2,
//       "map": "Storm Point",
//       "start": 1664298000,
//       "end": 1667930400
//     }
//   }
// }

const getCurrentMap = async function() {
  try {
    const getRes = await axios.get(`https://fn.alphaleagues.com/v2/apex/map/`);
    /** @type {MapApiResponse} **/
    const res = getRes.data;
    return res.br.map;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getCurrentMap
};
