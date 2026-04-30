const coordinates = { latitude: "44.802381", longitude: "-122.794659" };
const apiKey = '42aa28a24fdd0f152ccf9c273e1dfeb4';

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${apiKey}`;

export { coordinates, apiKey, baseUrl }; 