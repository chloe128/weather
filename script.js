import axios from "axios";

const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

const api_key = "9fad75719e1794faca4a181a24be5b81";

async function getWeather(cityName) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`
    );
    if (response.status !== 200) {
      throw new Error("City not found");
    }
    const cityData = response.data;
    console.log("cityData", cityData);
    weather_img.src = `https://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`;
    temperature.innerHTML = `${Math.round(cityData.main.temp - 273.15)}°C`;
    description.innerHTML = `${cityData.weather[0].description}`;
    humidity.innerHTML = `${cityData.main.humidity}%`;
    wind_speed.innerHTML = `${cityData.wind.speed}Km/H`;
    //display(cityData);
  } catch (error) {
    console.error(error);
  }
}

searchBtn.addEventListener("click", () => {
  getWeather(inputBox.value);
  getForecast(inputBox.value);
});

async function getForecast(cityName) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}&units=metric`
    );
    if (response.status !== 200) {
      throw new Error("City not found!");
    }
    const cityForecastData = response.data;
    console.log("cityForecastData", cityForecastData);
    displayForecast(cityForecastData);
  } catch (error) {
    console.error(error);
  }
}

function displayForecast(cityForecastData) {
  const foreCastHead = document.getElementById("fivedays");
  const forcast = document.getElementById("forcast");
  foreCastHead.innerHTML = "<h2>5-Day Forecast</h2>";
  let forecastHtml = "";

  console.log(cityForecastData.list);
  cityForecastData.list.forEach((foreCast, index) => {
    if (index % 8 === 0) {
      const minTemp = Math.min(
        ...cityForecastData.list
          .slice(index, index + 8)
          .map((item) => item.main.temp_min)
      );
      const maxTemp = Math.max(
        ...cityForecastData.list
          .slice(index, index + 8)
          .map((item) => item.main.temp_max)
      );

      forecastHtml += `
              <div class="forecast-block">
                  <p> ${new Date(foreCast.dt_txt).toLocaleDateString()}</p>
                  <p> ${minTemp.toFixed(1)}°C - ${maxTemp.toFixed(1)}°C</p>
                  <img src="http://openweathermap.org/img/wn/${
                    foreCast.weather[0].icon
                  }.png" alt="Weather icon">

              </div>
          `;
    }
  });
  // const forcast = document.getElementById("forcast");
  // forcast.innerHTML += forecastHtml;

  forcast.innerHTML = forecastHtml;
}

// async function display(cityData) {
//   temperature.innerHTML = `${cityData.main.temp}`;
//   //description.innerHTML;
// }

// async function checkWeather(city) {
//   const api_key = "4cd0eee81294c867b4bc4cfc64e998c5";
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

//   const weather_data = await fetch(`${url}`).then((response) =>
//     response.json()
//   );

//   if (weather_data.cod === `404`) {
//     location_not_found.style.display = "flex";
//     weather_body.style.display = "none";
//     console.log("error");
//     return;
//   }

//   console.log("run");
//   location_not_found.style.display = "none";
//   weather_body.style.display = "flex";
//   temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
//   description.innerHTML = `${weather_data.weather[0].description}`;

//   humidity.innerHTML = `${weather_data.main.humidity}%`;
//   wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

//   switch (weather_data.weather[0].main) {
//     case "Clouds":
//       weather_img.src = "/assets/cloud.png";
//       break;
//     case "Clear":
//       weather_img.src = "/assets/clear.png";
//       break;
//     case "Rain":
//       weather_img.src = "/assets/rain.png";
//       break;
//     case "Mist":
//       weather_img.src = "/assets/mist.png";
//       break;
//     case "Snow":
//       weather_img.src = "/assets/snow.png";
//       break;
//   }

//   console.log(weather_data);
// }

// searchBtn.addEventListener("click", () => {
//   checkWeather(inputBox.value);
// });
