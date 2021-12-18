//Date Format
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinate) {
  let apiKey = "651edf040d549a2711ca409b8ff9c6f7";
  let lat = coordinate.lat;
  let lon = coordinate.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

//Weather Information
function showTemperature(response) {
  let temp = document.querySelector("#temp");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let maxTemp = document.querySelector("#maxTemp");
  let minTemp = document.querySelector("#minTemp");
  let name = document.querySelector("#place");
  farenheightTemp = response.data.main.temp;
  cityFeels = Math.round(response.data.main.feels_like);
  let cityHumidity = Math.round(response.data.main.humidity);
  cityMax = Math.round(response.data.main.temp_max);
  cityMin = Math.round(response.data.main.temp_min);
  let cityDescription = response.data.weather[0].description;
  let cityName = response.data.name;
  let date = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let windSpeed = document.querySelector("#windSpeed");
  let wind = Math.round(response.data.wind.speed);

  temp.innerHTML = Math.round(farenheightTemp);
  feelsLike.innerHTML = `Feels like: ${cityFeels}°`;
  humidity.innerHTML = `Humidity: ${cityHumidity}%`;
  description.innerHTML = `${cityDescription}`;
  maxTemp.innerHTML = `${cityMax}°`;
  minTemp.innerHTML = `${cityMin}°`;
  name.innerHTML = `${cityName}`;
  date.innerHTML = formatDate(response.data.dt * 1000);
  windSpeed.innerHTML = `Wind Speed: ${wind} km/h`;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${cityDescription}`);

  getForecast(response.data.coord);
}

//Forecast

function forecastDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();

  return days[day];
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let date = response.data.daily;
  date.forEach(function (forecastDay, index) {
    let fForecastMax = Math.round(forecastDay.temp.max);
    let fForecastMin = Math.round(forecastDay.temp.min);

    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
<div class="forecast-date">${forecastDays(forecastDay.dt)}</div>
<div class="icon-weather">
  <img
    class="forecast-icon"
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
    alt=""
    width="20px"
  />
</div>
<div class="forecast-temperature">
  <span class="forecast-max">  ${fForecastMax}°</span>|<span class="forecast-min">${fForecastMin}°</span>
</div>
</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// API connection
function citySearch(city) {
  let apiKey = "651edf040d549a2711ca409b8ff9c6f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}
//Search Engine

function handleSubmit(event) {
  event.preventDefault();
  let citySubmit = document.querySelector("#city-input");
  citySearch(citySubmit.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// Unit conversions
function showCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  farenheightLink.classList.remove("active");
  celciusLink.classList.add("active");
  farenheightLink.style.color = "#192a50";

  let celciusTemp = (5 * (farenheightTemp - 32)) / 9;
  temperatureElement.innerHTML = Math.round(celciusTemp);
  let minTemp = document.querySelector("#minTemp");
  let maxTemp = document.querySelector("#maxTemp");
  let feelsLike = document.querySelector("#feels-like");
  let cTempMin = Math.round((5 * (cityMin - 32)) / 9);
  let cTempMax = Math.round((5 * (cityMax - 32)) / 9);
  let cTempFeels = Math.round((5 * (cityFeels - 32)) / 9);

  maxTemp.innerHTML = `${cTempMax}°`;
  minTemp.innerHTML = `${cTempMin}°`;
  feelsLike.innerHTML = `Feels Like: ${cTempFeels}°`;
}

function showFarenheightTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  farenheightLink.classList.add("active");
  celciusLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(farenheightTemp);
  let minTemp = document.querySelector("#minTemp");
  let maxTemp = document.querySelector("#maxTemp");
  let feelsLike = document.querySelector("#feels-like");

  let fMin = Math.round(cityMin);
  let fMax = Math.round(cityMax);
  let fFeels = Math.round(cityFeels);
  minTemp.innerHTML = `${fMin}°`;
  maxTemp.innerHTML = `${fMax}°`;
  feelsLike.innerHTML = `Feels Like: ${fFeels}°`;
}
let farenheightTemp = null;
let cityMin = null;
let cityMax = null;
let cityFeels = null;

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showCelciusTemperature);

let farenheightLink = document.querySelector("#farenheight");
farenheightLink.addEventListener("click", showFarenheightTemperature);

citySearch("New York");
