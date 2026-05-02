import { coordinates, apiKey, baseUrl } from "./constants";


export function getWeatherData() {   
    return fetch(baseUrl).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error from weather API: ${res.status}`);
    }).then((data) => {
        return parseWeatherData(data);
    });
}

function parseWeatherData(data) {
    const parsedData = { temp: {}};

    parsedData.city = data.name;
    parsedData.temp.F = Math.floor(data.main.temp) + "°";
    parsedData.temp.C = Math.floor((data.main.temp - 32) * (5/9)) + "°";
    
    // parsedData.weatherCondition = data.weather[0].main.toLowerCase();
    parsedData.weatherCondition = "clouds";

    return parsedData;
}

function isDay(sunrise, sunset, timestamp) {
    return timestamp >= sunrise && timestamp < sunset;
}
