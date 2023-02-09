var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");
var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getLocation(city);
    weatherContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

var getLocation = function (city) {
    console.log(city);
    var locationUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=9b50b2f7f1fd75a06ed42b62ed3bd45e";
    console.log(locationUrl);
    fetch(locationUrl)
        .then(function (response) {
            console.log(response);
            response.json().then(function (data) {
            getWeather(data);
            });
        })
        .catch(function (error) {
        alert("Unable to connect to OpenWeather");
        });
    };


var getWeather = function (location) {
    console.log(location);
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + location[0].lat + "&lon=" + location[0].lon + "&units=imperial&appid=9b50b2f7f1fd75a06ed42b62ed3bd45e";
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            displayWeather(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
        })
        .catch(function (error) {
        alert("Unable to connect to OpenWeather");
        });
    };
var displayWeather = function (weather) {
    console.log(weather);
    weatherContainerEl.textContent = "";
    citySearchTerm.textContent = weather.city.name;
for (var i = 0; i < 5; i++) {
    var weatherForecast = weather.list[i];
    var weatherCard = document.createElement("div");
    weatherCard.classList = "card bg-primary text-light m-2";
    var weatherBody = document.createElement("div");
    weatherBody.classList = "card-body p-2";
    var weatherTitle = document.createElement("h4");
    weatherTitle.classList = "card-title";
    var weatherImg = document.createElement("img");
    weatherImg.setAttribute(
        "src",
        "https://openweathermap.org/img/w/" + weatherForecast.weather[0].icon + ".png"
    );
    var weatherTemp = document.createElement("p");
    weatherTemp.classList = "card-text";
    weatherTemp.textContent = "Temp: " + weatherForecast.main.temp + " °F";
    var weatherWind = document.createElement("p");
    weatherWind.classList = "card-text";
    weatherWind.textContent = "Wind: " + weatherForecast.wind.speed + " MPH";
    var weatherHumidity = document.createElement("p");
    weatherHumidity.classList = "card-text";
    weatherHumidity.textContent = "Humidity: " + weatherForecast.main.humidity + "%";
    weatherBody.appendChild(weatherTitle);
    weatherBody.appendChild(weatherImg);
    weatherBody.appendChild(weatherTemp);
    weatherBody.appendChild(weatherWind);
    weatherBody.appendChild(weatherHumidity);
    weatherCard.appendChild(weatherBody);
    weatherContainerEl.appendChild(weatherCard);
    };
};
cityFormEl.addEventListener("submit", formSubmitHandler);