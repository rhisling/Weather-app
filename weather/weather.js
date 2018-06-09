const request = require("request");

const getWeather = (lat, long, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/576598b46ac473447fe030d5b4e76899/${lat},${long}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
        // console.log(body.currently.temperature);
      } else {
        console.log("Unable to fetch weather");
      }
    }
  );
};

module.exports = {
  getWeather
};
