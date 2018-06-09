const request = require("request");
const yargs = require("yargs");

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
var encodedAddress = encodeURIComponent(argv.address);

request(
  {
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  },
  (error, response, body) => {
    if (error) {
      console.log("Unable to connect to google servers");
    } else if (body.status === "ZERO_RESULTS") {
      console.log("unable to find that address");
    } else if (body.status === "OK") {
      console.log(`Address : ${body.results[0].formatted_address}`);
      console.log(`Latitude : ${body.results[0].geometry.location.lat}`);
      console.log(`Longitude : ${body.results[0].geometry.location.lng}`);
    }
    // console.log(JSON.stringify(body, undefined, 2));
  }
);
