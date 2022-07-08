if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const axios = require("axios");
const API_KEY = process.env.WEATHER_API_KEY;
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("public"));

app.post("/weather", (req, res, next) => {
  const cityName = req.body.name;
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
  axios({
    url: weatherURL,
    responseType: "json",
  })
    .then((data) => res.json(data.data))
    .catch(next);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
