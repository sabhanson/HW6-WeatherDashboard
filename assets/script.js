//submit button click listener runs function to bring up specific city based on user input
//fetch request API to gather necessary data
    //temperature
    //wind
    //humidity

//localStorage list of previously searched locations, when they are clicked, city is reentered into the search bar to repopulate info on the page
    //localstorage will store previously searched city
    //create a new button from that search
    //button click, fetch function is run
    //
//DOM manipulation to push data onto the page for today weather and 5 day forecast
//define variables
//

//MY API KEY : d22455c31574a84b22d1c94f4c33f19c
//API CALL : api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var searchInput = document.querySelector('.searchBar');
var submitBtn = document.querySelector('.submitBtn')
var emoji = document.querySelector('.testing');
var todayName = document.querySelector('.cityName')
var cityName = "vancouver"
const searchBox = document.querySelector('.search-container');
var placeholdBtn = document.querySelector('.historyCity');
const APIweather = 'https://api.openweathermap.org/data/2.5/weather?q=';


function test() {

    var cityQuery = APIweather + cityName + '&units=imperial&appid=d22455c31574a84b22d1c94f4c33f19c';
    fetch(cityQuery)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        //city name
        console.log(data.name);
        //weather forecast emoji
        console.log(data.weather[0].icon + '.png')
        //temperature
        console.log(data.main.temp + ' deg farenheit')
        //wind
        console.log(data.wind.speed + ' MPH')
        //humidity
        console.log(data.main.humidity + '%')

    })

    };

test();

submitBtn.addEventListener('click', function() {
    var city = searchInput.value;
    console.log(city);
    todayName.textContent = city;
    localStorage.setItem("prevSearch",JSON.stringify(city))
    var yeah = localStorage.getItem("prevSearch")
    placeholdBtn.innerHTML = JSON.parse(yeah)
})

//submit button takes the value (city) that was entered into the search bar. needs to populate that info into the container
//then run api function to pull data into container

