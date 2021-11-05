/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
// const { fetchMyIP,fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

//  fetchMyIP((error, ip) => {
//    if (error) {
//      console.log("It didn't work!" , error);
//      return;
//    }

//    console.log('It worked! Returned IP:' , ip);

//  });
// ip = "99.234.207.222";

// fetchCoordsByIP(ip,(error,data) => {
//     if (error) {
//         console.log("It didn't work!", error);
//         return;
//     }

//     console.log('It worked! ', data);
// });


// fetchISSFlyOverTimes({latitude: '49.27670', longitude: '-123.13000'},(error,data) => {
//     if (error) {
//         console.log("It didn't work!", error);
//         return;
//     }

//     console.log('It worked! ', data);
// });
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function (passTimes) {
    for (const pass in passTimes) {
        if (Array.isArray(passTimes[pass])) {
            for (let ele of passTimes[pass]) {
                const datetime = new Date(0);
                datetime.setUTCSeconds(ele.risetime);
                const duration = ele.duration;
                console.log(`Next pass at ${datetime} for ${duration} seconds!`);
            }
        }
    }
};

nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
        return console.log("It didn't work!", error);
    }
    // success, print out the deets!
    printPassTimes(passTimes);
    //console.log(passTimes);
});