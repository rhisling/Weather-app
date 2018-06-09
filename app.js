const request = require("request");

request(
  {
    url:
      "http://maps.googleapis.com/maps/api/geocode/json?address=3191%20dunwich%20court%20california",
    json: true
  },
  (error, response, body) => {
    console.log(body);
  }
);
