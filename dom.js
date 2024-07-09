export function updateWeatherInfo(data) {
  const weatherInfoDiv = document.getElementById("weather-info");
  if (data.cod === 200) {
    weatherInfoDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
  } else {
    weatherInfoDiv.innerHTML = `<p>Location not found. Please try again.</p>`;
  }
}
