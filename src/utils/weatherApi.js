import { coordinates, getWeatherUrl } from "./constants";

export function getWeatherData(latitude = coordinates.latitude, longitude = coordinates.longitude) {
  const url = getWeatherUrl(latitude, longitude);

  return fetch(url)
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error from weather API: ${res.status}`);
    })
    .then((data) => {
      return parseWeatherData(data);
    });
}

function parseWeatherData(data) {
  const parsedData = { temp: {} };

  parsedData.city = data.name;
  parsedData.type = getWeatherType(data.main.temp);
  parsedData.temp.F = Math.floor(data.main.temp) + "°";
  parsedData.temp.C = Math.floor((data.main.temp - 32) * (5 / 9)) + "°";

  // parsedData.weatherCondition = data.weather[0].main.toLowerCase();
  parsedData.weatherCondition = "clouds";

  parsedData.isDay = isDay(data.sys, Date.now());

  return parsedData;
}

function isDay({ sunrise, sunset }, timestamp) {
  const timestampInSeconds = Math.floor(timestamp / 1000);
  return sunrise < timestampInSeconds && timestampInSeconds < sunset;
}

function getWeatherType(temp) {
  if (temp >= 86) {
    return "hot";
  }
  if (temp >= 66 && temp <= 85) {
    return "warm";
  }
  return "cold";
}
