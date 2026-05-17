const coordinates = { latitude: "44.802381", longitude: "-122.794659" };
const apiKey = "42aa28a24fdd0f152ccf9c273e1dfeb4";
const getWeatherUrl = (latitude, longitude) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
const baseUrl = getWeatherUrl(coordinates.latitude, coordinates.longitude);

const weatherConditionImages = {
  day: {
    sunny: {
      image: new URL("../assets/Day/sunny.svg", import.meta.url),
    },
    clouds: {
      image: new URL("../assets/Day/cloudy-card.svg", import.meta.url),
    },
    rain: {
      image: new URL("../assets/Day/rain.svg", import.meta.url),
    },
    snow: {
      image: new URL("../assets/Day/snow.svg", import.meta.url),
    },
    fog: {
      image: new URL("../assets/Day/fog.svg", import.meta.url),
    },
    storm: {
      image: new URL("../assets/Day/storm.svg", import.meta.url),
    },
  },
  night: {
    sunny: {
      image: new URL("../assets/Night/sunny-night.svg", import.meta.url),
    },
    clouds: {
      image: new URL("../assets/Night/cloudy-night.svg", import.meta.url),
    },
    rain: {
      image: new URL("../assets/Night/rain-night.svg", import.meta.url),
    },
    snow: {
      image: new URL("../assets/Night/snow-night.svg", import.meta.url),
    },
    fog: {
      image: new URL("../assets/Night/fog-night.svg", import.meta.url),
    },
    storm: {
      image: new URL("../assets/Night/storm-night.svg", import.meta.url),
    },
  },
};

export { coordinates, apiKey, baseUrl, getWeatherUrl, weatherConditionImages };
