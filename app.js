import { getWeather } from "./api.js";
import { updateWeatherInfo } from "./dom.js";

document.getElementById("search-button").addEventListener("click", async () => {
  const location = document.getElementById("location-input").value;
  const weatherData = await getWeather(location);
  updateWeatherInfo(weatherData);
});
