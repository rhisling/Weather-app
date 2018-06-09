const request = require("request");

const getWeather = () => {
  request(
    {
      url:
        "https://api.darksky.net/forecast/576598b46ac473447fe030d5b4e76899/37.8267,-122.4233",
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(body.currently.temperature);
      } else {
        console.log("Unable to fetch weather");
      }
    }
  );
};

module.exports = {
  getWeather
};
