const request = require('request');

const baseUrl = `http://api.weatherstack.com`;
const access_key = '58c3a1f6689a8ac416d361bcc0592355';

const getWeatherUpdate = (address, callback) => {
  const url = `${baseUrl}/current?access_key=${access_key}&query=${address}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else {
      const { name: location, localtime } = response.body.location;
      const {
        temperature,
        feelsLikeTemp,
        weather_descriptions,
      } = response.body.current;
      const weather_description = weather_descriptions[0];
      const forecast = `${weather_description}. It is currently ${temperature} degrees out. It feels like ${feelsLikeTemp} degrees out.`;
      callback(undefined, {
        location,
        forecast,
      });
    }
  });
};

module.exports = getWeatherUpdate;
