// variable to store searched city
var city = "";

// global variables
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWSpeed=$("#wind-speed");
var currentUvindex= $("#uv-index");
var sCity = [];

// function to search to see if searched city is in the entries from storage
function find(c){
    for (var i = 0; i<sCity.length; i++){
        if (c.toUpperCase() === sCity[i]){
            return -1;
        }
    }
    return 1;
}

// API key
var APIKey = "5cbd72fd5e331dfb73ef7b35fe744b79";

// AJAX call
function currentWeather(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    
}
