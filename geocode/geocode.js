const request = require("request");

const geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request(
    {
      url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to google servers");
      } else if (body.status === "ZERO_RESULTS") {
        callback("Unable to find that address");
      } else if (body.status === "OK") {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
      // console.log(JSON.stringify(body, undefined, 2));
    }
  );
};

module.exports = {
  geocodeAddress
};

// 576598b46ac473447fe030d5b4e76899
