import { coordinates, apiKey, baseUrl } from "./constants";


export function getWeatherData() {   
    return fetch(baseUrl).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error from weather API: ${res.status}`);
    }).then((data) => {
        return parseWeatherData(data);
    });
}

function parseWeatherData(data) {
    const parsedData = {};

    parsedData.city = data.name;
    parsedData.temp = Math.floor(data.main.temp) + "°" + " " + "F";

    return parsedData;
}
