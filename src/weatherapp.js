function showTemperature(response) {
  console.log(response.data);
}

let apiKey = "651edf040d549a2711ca409b8ff9c6f7";
let apiUrl = `api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(showTemperature);
