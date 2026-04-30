import { coordinates, apiKey, baseUrl } from "./constants";


export function getWeatherData() {   
    return fetch(baseUrl).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error from weather API: ${res.status}`);
    });
}
