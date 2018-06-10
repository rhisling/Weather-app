const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
  .option({
    a: {
      demandOption: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;
//console.log(argv);

const encodedAddress = encodeURIComponent(argv.a);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios
  .get(geocodeUrl)
  .then(response => {
    if (response.data.status === "ZERO_RESULTS") {
      console.log("Unable to find that address");
    } else {
      const lat = response.data.results[0].geometry.location.lat;
      const long = response.data.results[0].geometry.location.lng;
      const weatherUrl = `https://api.darksky.net/forecast/576598b46ac473447fe030d5b4e76899/${lat},${long}`;
      console.log(response.data.results[0].formatted_address);
      return axios.get(weatherUrl);
    }
  })
  .then(response => {
    //console.log(response.data);
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(
      `It's currently ${temperature}. It feels like ${apparentTemperature}`
    );
  })
  .catch(e => {
    if (e.code === "ENOTFOUND") {
      console.log("Unable to connect to weather api servers");
    } else if (e.response.status === 404) {
      console.log("Unable to connect to api maps api server");
    }
  });
