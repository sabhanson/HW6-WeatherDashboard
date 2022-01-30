//START OVER PSUEDOCODE

//FIRST, TEXTINPUT FIELD "SEARCH FOR A CITY" ADD EVENT LISTENER CLICK ON SUBMIT BUTTON
    //THEN
        //TODAY'S WEATHER EMOJI, TEMP, WIND, AND HUMIDITY APPEAR IN TOP LARGE SECTION
        //EACH OF THE NEXT FIVE DAYS EMOJI, TEMP, WIND, AND HUMIDITY APPEAR IN THE DAY CARDS
//PREVIOUS SEARCHED CITY IS BEING MADE INTO A BUTTON AND SAVED ON THE LEFT SIDE
    //SAVE PREVIOUS CITIES INTO AN ARRAY AND HAVE THE ARRAY PUT INTO BUTTONS??

//API CALL TO RECEIVE TODAY'S EMOJI, TEMP, WIND, HUMIDITY
//API CALL TO RECEIVE 5 DAY EMOJIS, TEMPS, WINDS, HUMIDITIES














//submit button click listener runs function to bring up specific city based on user input
//fetch request API to gather necessary data
    //temperature
    //wind
    //humidity
    //UV index value

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


//what is typed in the searchbar
var searchInput = document.querySelector('.searchBar');
var searchInputValue = searchInput.value;
//literally the submit button itself
var submitBtn = document.querySelector('.submitBtn');
//name of city displayed in the large box
var todayName = document.querySelector('.cityName');
var cityName = "vancouver"
//container that holds search bar, submit, and previously searched city buttons
const searchBox = document.querySelector('.search-container');
//placeholder grey button for the previously searched cities
var placeholdBtn = document.querySelector('.placeholderBtn');
//create a button element for previously searched city
var prevSearchBtn = document.createElement("button");
var buttonContainer = document.querySelector(".buttons");
//first half of the API URL that will search a specific city
const APIweather = 'https://api.openweathermap.org/data/2.5/weather?q=';
//each of the five day forecast cards
var cards = document.querySelector('.dayCard');
//adding moment (what day is it???) to each card
var today = document.querySelector('#today');
today.textContent = moment().format('l');
var card1 = document.querySelector('.one');
card1.textContent = moment().add(1, 'day').format('l');
var card2 = document.querySelector('.two');
card2.textContent = moment().add(2, 'day').format('l');
var card3 = document.querySelector('.three');
card3.textContent = moment().add(3, 'day').format('l');
var card4 = document.querySelector('.four');
card4.textContent = moment().add(4, 'day').format('l');
var card5 = document.querySelector('.five');
card5.textContent = moment().add(5, 'day').format('l');
var tempToday = document.querySelector('.todayTemp')



test();

function test() {
    var searchInput = document.querySelector('.searchBar');
    var searchInputValue = searchInput.value;
    var cityQuery = APIweather + searchInputValue + '&units=imperial&appid=d22455c31574a84b22d1c94f4c33f19c';
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
        var temp = data.main.temp;
        tempToday.textContent = 'Temp: ' + temp + ' \xB0F'
        //wind
        console.log(data.wind.speed + ' MPH')
        //humidity
        console.log(data.main.humidity + '%')

    })

    };


    
    submitBtn.addEventListener('click', function() {
        var saveCity = searchInput.value;
        todayName.textContent = saveCity;
        localStorage.setItem("newCity", saveCity);
        var newBtn = document.createElement("button");
        newBtn.type = 'button',
        newBtn.innerHTML = saveCity;
        newBtn.className = "placeholderBtn"
        //this is working to append the button to the list of buttons
        buttonContainer.appendChild(newBtn);
        localStorage.getItem("newCity")
    })
    

    newBtn.addEventListener('click', function () {
        todayName.textContent = newBtn;
    })
    
    
    //submit button takes the value (city) that was entered into the search bar. needs to populate that info into the container
    //then run api function to pull data into container
    
    
    
    
    //IDEAS
    //TODO: for each day to show up in the 5 day forecast cards:
    //add a data attribute "data-day" to each card. example: data-day: 1 would then be in a function for moment moment().add(data-day, 'day').format('l)
    
   
    