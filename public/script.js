const container = document.querySelector(".container");
const form = document.querySelector("#form");
const infoText = document.querySelector(".info-text");
const inputField = document.querySelector(".input-field");
const weatherInfo = document.querySelector(".weather-info");
const weatherDetails = document.querySelector(".weather-details");
const date = document.querySelector(".date");
const btnSearch = document.querySelector(".btn-search");
const btnBack = document.querySelector(".btn-back");

function fetchWeather(city) {
  infoText.innerText = "Searching...";
  infoText.classList.add("success");
  infoText.classList.replace("error", "success");

  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: city,
    }),
  })
    .then((res) => res.json())
    .then((data) => weatherData(data))
    .catch((error) => {
      console.error(error.message);
      infoText.classList.replace("success", "error");
      infoText.innerText = `${inputField.value} is not a valid city name`;
    });
}

function weatherData(info) {
  const city = info.name;
  const { country } = info.sys;
  const { description, icon } = info.weather[0];
  const { temp, humidity } = info.main;
  const { speed } = info.wind;
  const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  const location = `<i class="fas fa-map-marker-alt"></i> ${city}, ${country}`;
  const tempo = Math.round(temp);
  const day = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: `long` });

  date.innerText = `Today, ${day} ${month}`;
  container.querySelector(".weather-icon").src = iconURL;
  container.querySelector(".weather-degree").innerText = `${tempo}°`;
  container.querySelector(".weather-description").innerText = description;
  container.querySelector(".weather-location").innerHTML = location;
  container.querySelector(".weather-humidity").innerText = `${humidity}%`;
  container.querySelector(".weather-wind").innerText = `${speed} km/h`;

  infoText.classList.remove("success", "error");
  btnBack.classList.add("active");
  form.classList.add("active");
  weatherInfo.classList.add("active");
  weatherDetails.classList.add("active");
}

form.addEventListener("click", (evt) => {
  evt.preventDefault();
});

inputField.addEventListener("keyup", (evt, cityName) => {
  if (evt.key === "Enter" && inputField.value !== "") {
    cityName = inputField.value;
    fetchWeather(cityName);
  }
});

btnSearch.addEventListener("click", (cityName) => {
  if (inputField.value !== "") {
    cityName = inputField.value;
    fetchWeather(cityName);
  }
});

btnBack.addEventListener("click", () => location.reload());
