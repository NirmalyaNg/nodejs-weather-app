const request = require("request");

const forecast = (latitude, longitude, place, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e69165c6740eda10bfe999e7cf0df238&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services.", undefined);
    } else if (response.body.error) {
      callback("Invalid location.Please try another search.", undefined);
    } else {
      const {
        temperature,
        weather_descriptions: [description],
        feelslike,
        weather_icons: [icon],
      } = response.body.current;

      callback(undefined, {
        temperature,
        description,
        feelslike,
        place,
        icon,
      });
    }
  });
};

module.exports = {
  forecast,
};
