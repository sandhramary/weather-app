const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const forecastUrl = `https://api.weatherstack.com/current?access_key=96a2937534887ab0d5a8aa187472293b&query=${latitude},${longitude}&units=f`;

  request({ url: forecastUrl, json: true }, (error, response) => {
    if (error) {
      callback({ error: "Something went wrong", response: null });
    } else if (!response?.body?.current)
      callback({ error: "Couldn't find", response: null });
    else
      callback({
        error: null,
        response: {
          temperature: response.body.current?.temperature,
          feelslike: response.body.current?.feelslike,
        },
      });
  });
};

module.exports = forecast;
