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
    hours = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
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
  let cityTemp = Math.round(response.data.main.temp);
  let cityFeels = Math.round(response.data.main.feels_like);
  let cityHumidity = Math.round(response.data.main.humidity);
  let cityMax = Math.round(response.data.main.temp_max);
  let cityMin = Math.round(response.data.main.temp_min);
  let cityDescription = response.data.weather[0].description;
  let cityName = response.data.name;
  let date = document.querySelector("#date");

  temp.innerHTML = `${cityTemp}°`;
  feelsLike.innerHTML = `Feels like: ${cityFeels}°`;
  humidity.innerHTML = `Humidity: ${cityHumidity}%`;
  description.innerHTML = `${cityDescription}`;
  maxTemp.innerHTML = `${cityMax}°`;
  minTemp.innerHTML = `${cityMin}°`;
  name.innerHTML = `${cityName}`;
  date.innerHTML = formatDate(response.data.dt);
}
// API connection
let apiKey = "651edf040d549a2711ca409b8ff9c6f7";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(showTemperature);
