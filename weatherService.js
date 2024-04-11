import { apiKey, apiUrl } from "./properties.js";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

/**
 * Function for getting weather for the entered city.
 * @param {string} city city name
 */
async function processWeather(city) {
  try {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    if (response.status == 404) {
      throw new Error("Invalid city name exception!");
    }

    let data = await response.json();

    updateWeatherData(data);
    updateWeatherIcon(data.weather[0].main);

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  } catch (error) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

/**
 * Function for updating weather indicators to new data.
 * @param {json} data weather data
 */
function updateWeatherData(data) {
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
}

/**
 * Function for updating weather icon to a new one.
 * @param {string} weatherState weather state
 */
function updateWeatherIcon(weatherState) {
  switch (weatherState) {
    case "Clear":
      weatherIcon.src = "images/clear.png";
      break;
    case "Clouds":
      weatherIcon.src = "images/clouds.png";
      break;
    case "Drizzle":
      weatherIcon.src = "images/drizzle.png";
      break;
    case "Mist":
      weatherIcon.src = "images/mist.png";
      break;
    case "Rain":
      weatherIcon.src = "images/rain.png";
      break;
    case "Snow":
      weatherIcon.src = "images/snow.png";
      break;
  }
}

/**
 * Listener for search button.
 */
searchBtn.addEventListener("click", () => {
  processWeather(searchBox.value);
});
