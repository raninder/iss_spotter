const request = require('request');

const fetchMyIP = function (callback) {
    // use request to fetch IP address from JSON API
    const url = "https://api.ipify.org?format=json";

    request(url, (error, response, body) => {
        if (error) {
            callback(error, null);
        }
        // if non-200 status, assume server error
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        }
        const ip = JSON.parse(body).ip;
        callback(null, ip);

    });
}
//https://api.freegeoip.app/json/8.8.8.8?apikey=XXXXXXXXXXXXXX

apikey = "2a25f320-3dde-11ec-be22-79807f47c3d0";
fetchCoordsByIP = function (ip, callback) {
    const url = `https://api.freegeoip.app/json/${ip}?apikey=${apikey}`;

    request(url, (error, response, body) => {
        if (error) {
            callback(error, null);
        }
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} coordinates for IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        }
        JSON.parse(body)
        const latitude = JSON.parse(body).latitude;
        const longitude = JSON.parse(body).longitude
        callback(null, { latitude, longitude });
    });
}


const fetchISSFlyOverTimes = function (coords, callback) {
    // use request to fetch IP address from JSON API
    const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

    request(url, (error, response, body) => {
        if (error) {
            callback(error, null);
        }
        // if non-200 status, assume server error
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        }
        const data = JSON.parse(body);
        callback(null, data);

    });
}
// **
// * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
// * Input:
// *   - A callback with an error or results. 
// * Returns (via Callback):
// *   - An error, if any (nullable)
// *   - The fly-over times as an array (null if error):
// *     [ { risetime: <number>, duration: <number> }, ... ]
// */ 
const nextISSTimesForMyLocation = function (callback) {
    fetchMyIP((error, ip) => {
        if (error) {
            return callback(error, null);
        }
        fetchCoordsByIP(ip, (error, coords) => {
            if (error) {
                return callback(error, null);
            }
            fetchISSFlyOverTimes(coords, (error, nextPasses) => {
                if (error) {
                    return callback(error, null);
                }
                callback(null, nextPasses);
            });
        });
    });
};

//module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
module.exports = { nextISSTimesForMyLocation };
