const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibmlybWFseWFuZ2dnIiwiYSI6ImNrb2Zranl0dzBnMzIzMGxhaXExdzBmazUifQ.L5UycGrnkpa209Meqds4NA&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to geocoding services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Invalid location.Try another search.");
    } else {
      const {
        place_name,
        center: [longitude, latitude],
      } = response.body.features[0];

      callback(undefined, {
        place: place_name,
        latitude,
        longitude,
      });
    }
  });
};

module.exports = {
  geocode,
};
