// variable to store searched city
var city = "";

// global variables
// var searchCity = $("#search-city").val();
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUvindex = $("#uv-index");
var sCity = [];

// function to search to see if searched city is in the entries from storage
function find(c) {
    for (var i = 0; i < sCity.length; i++) {
        if (c.toUpperCase() === sCity[i]) {
            return -1;
        }
    }
    return 1;
}

// API key
const APIKey = "5cbd72fd5e331dfb73ef7b35fe744b79";

// AJAX call
function currentWeather(citySearch) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=" + APIKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {

        // display current weather, city name, date
        console.log(response);

        // convert temp to Fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.8 + 32;
        $(currentTemperature).html((tempF).toFixed(2) + "&#8457");

        // display humidity
        $(currentHumidty).html(response.main.humidty + "&");

        // display windspeed in MPH
        var windKPH = response.wind.speed;
        var windMPH = (windKPH * 2.237).toFixed(1);
        $(currentWindSpeed).html(windMPH + "MPH");

        // display UV index
        // using the geographic coordinates method with the appid and coordinates as parameters
        UVIndex(response.coord.lon, response.coord.lat);
        forecast(response.id);
        if (response.cod == 200) {
            sCity = JSON.parse(localStorage.getItem("cityname"));
            console.log(sCity);
            if (sCity == null) {
                sCity = [];
                sCity.push(city.toUpperCase());
                localStorage.setItem("cityname", JSON.stringify(sCity));
                addToList(city);
            } else {
                if (find(city) < 0) {
                    sCity.push(city.toUpperCase());
                    localStorage.setItem("cityname", JSON.stringify(sCity));
                }
            }
        }
    });
}

// function returns UVIndex response
function UVIndex(ln, lt) {
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lt + "&lon=" + ln;
    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (response) {
        $(currentUvindex).html(response.value);
    });
}

// display 5 day forecast for current city
function forecast(cityid) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + APIKey;
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {

        // add new elements up to 5 days
        for (i = 0; i < 5; i++) {
            var date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            var iconcode = response.list[((i + 1) * 8) - 1].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
            var tempK = response.list[((i + 1) * 8) - 1].main.temp;
            var tempF = (((tempK - 273.5) * 1.80) + 32).toFixed(2);
            var humidity = response.list[((i + 1) * 8) - 1].main.humidity;

            $("#futureDate" + i).html(date);
            $("#futureImg" + i).html("<img src=" + iconurl + ">");
            $("#futureTemp" + i).html(tempF + "&#8457");
            $("#futureHumidity" + i).html(humidity + "%");

        }
    });
}

// add city in search history
function addToList(c) {
    var listElement = $("<li>" + c.toUpperCase() + "</li>");
    $(listElement).attr("class", "list-item");
    $(listElement).attr("data-value", c.toUpperCase());
    $(".list-item").append(listElement);
}

// display the weather when past searched city is clicked
function pastSearch(event) {
    var listElement = event.target;
    if (event.target.matches("li")) {
        city = listElement.textContent.trim();
        currentWeather(city);
    }
}

// create searched list
function lastCity() {
    $("ul").empty();
    var searchedCity = JSON.parse(localStorage.getItem("cityname"));
    if (searchedCity !== null) {
        searchedCity = JSON.parse(localStorage.getItem("cityname"));
        for (i = 0; i < searchedCity.lenght; i++) {
            addToList(searchedCity[i]);
        }
        city = searchedCity[i - 1];
        currentWeather(city);
    }
}

// clear the search history 
function clearHistory(event) {
    event.preventDefault();
    searchedCity = [];
    localStorage.removeItem("cityname");
    document.location.reload();
}

// click events
$("#search-button").on("click", function(){
    var citySearch = $("#search-city").val();
    currentWeather(citySearch);
});
$(document).on("click", pastSearch);
$(window).on("load", lastCity);
$("#clear-history").on("click", clearHistory);