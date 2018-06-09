const request = require("request");
const yargs = require("yargs");

const geocode = require("./geocode/geocode");
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

geocode.geocodeAddress(argv.address);
