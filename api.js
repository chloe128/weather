export const API_KEY = "YOUR_API_KEY";
export const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export async function getWeather(location) {
  const response = await fetch(
    `${BASE_URL}weather?q=${location}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  return data;
}
