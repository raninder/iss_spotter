//const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');

//**function call fetchMyIP(callback)
// Call 
nextISSTimesForMyLocation()
    .then((passTimes) => {
        printPassTimes(passTimes);
    })
    .catch((error) => {
        console.log("It didn't work: ", error.message);
    });

    const printPassTimes = function(passTimes) {
        for (const pass of passTimes) {
          const datetime = new Date(0);
          datetime.setUTCSeconds(pass.risetime);
          const duration = pass.duration;
          console.log(`Next pass at ${datetime} for ${duration} seconds!`);
        }
      };
      

