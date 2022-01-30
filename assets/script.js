// SUNDAY JAN 30TH SOLUTION

//"when I search for a city I am presented with current and future conditions for that city and it's added to the search history"
    //searchCity function that takes the input value and puts it into the API call
        //function should be a fetch request to fetch the API data then post it to the appropriate areas
        //must return true if the api url exists(aka a real city)
        //must return false (alert??) if the api url doesnt exist(klsdafjklsdfkljad)
    //then after API call, the API data is placed into the correct parts of the document
        //ex. var todaytemp = document.queryselector
    //then the button is appended to the button container

//"when I view current weather conditions for that city then I am presented with the city name, the date, an icon representation of weather conditions, the temp, the humidity, the wind speed, and the UV index"
    //API data needs to be pulled
        //city name (data.name)
        //today's date
        //weather emoji (data.weather[0].icon)
        //temperature (data.main.temp)
        //humidity (data.main.humidity)
        //wind speed (data.wind.speed)
        //uv index

//"when I view the UV index, I am presented with a color that indicates whether the conditions are favorable, moderate, or severe"
    //if (uv > x) {add class " red background"}
//"when I view future weather conditions for that city, then I am presented with a 5 day forecast that displays the date, an icon representation for weather conditions, the temp, the wind speed, and the humidity"
    //
//"when I click on a city in the search history then I am again presented with current and fguture conditions for that city"
    //run the searchCity function again but this time it's the button value??






//_______________________________________________________________________________________________________________________________________________________________________________________________________
//FETCH REQUESTS AND THE DATA VALUES THAT NEED TO BE TAKEN

//TODO: fetch request to WEATHER API ('https://api.openweathermap.org/data/2.5/weather?q={CITYNAMEGOESHERE}&units=imperial&appid=d22455c31574a84b22d1c94f4c33f19c')
    //needs to take in the USER SEARCH INPUT VALUE into the CITYNAMEGOESHERE
    //needs to have units=imperial to return data in american english terms
    //needs to have appid equal to my API key

    //TODO: return the following data from this API fetch
        //data.coord.lat = return the city's latitude, needs to be set to a variable to call in the next API fetch request
        //data.coord.lon = return the city's longitude, needs to be set to a variable to call in the next API fetch request
        //data.name = returns the name of the searched city, needs to be set to text.content of the HTML main card cityName
        //data.dt = returns today's date in UNIX format, needs to be converted to MM/DD/YYYY and set to the text.content of HTML main card today date
        //data.weather[0].icon = returns the icon code of today's forecast emoji, needs to be set to a variable and used in 'http://openweathermap.org/img/wn{ICONVARIABLE}.png' and set to the a tag of the HTML main card emoji 
        //data.main.temp = returns today's temp in F, needs to be set to text.content of the HTML main card temperature
        //data.wind.speed = returns today's wind speed in MPH, needs to be set to text.content of the HTML main card wind
        //data.main.humidity = returns today's humidity in %, needs to be set to text.content of the HTML main card humidity

//TODO: fetch request to ONECALL API ('https://api.openweathermap.org/data/2.5/onecall?lat={LATVARIABLEHERE}&lon={LONVARIABLEHERE}&units=imperial&appid=d22455c31574a84b22d1c94f4c33f19c')
    //needs to take in lat and long from the WEATHER API fetch request and put those in {LATVARIABLEHERE} and {LONVARIABLEHERE}
    //needs to have units = imperial to return data in american english terms
    //needs to have appid equal to my API key

    //TODO: return the following data from the API fetch
        //data.current.uvi = returns today's uvi value, needs to be set to a variable to change the text.content of HTML main card UVI
            //if uvi > certain values, change color to correspond to certain UVI value
            //use (https://www.epa.gov/sunsafety/uv-index-scale-0) to decide which color, green, yellow, orange, red, purple
        //TODO: return the following values for each daily[1], daily[2], daily[3], daily[4], daily[5] in an iteration loop
            //data.daily[x].dt = returns particular day in UNIX format, needs to be converted to MM/DD/YYYY and set to text.content of the particular forecast card day date
            //data.daily[x].weather[0].icon = returns the icon code of particular day's forecast emoji, needs to be set to a variable and used in 'http://openweathermap.org/img/wn{ICONVARIABLE}.png' and set to the a tag of the particular forecast card
            //data.daily[x].temp.max = returns the particular day's temp in F, needs to be set to text.content of the HTML particular day card temperature
            //data.daily[x].wind_speed = returns particular day's wind speed in MPH, needs to be set to text.content of the HTML particular day forecast card wind
            //data.daily[x].humidity = returns particular day's humidity in %, needs to be set to text.content of the HTML particular forecast card humidity









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


//this one call has vancouver's lat/long inputted and my API key
const oneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=49.2497&lon=-123.1193&units=imperial&appid=d22455c31574a84b22d1c94f4c33f19c'

function searchCity() {
    //this is selecting the area of the HTML document where the user types
    var searchInput = document.querySelector('.searchBar');
    //this is actually pulling out the string value of the search request
    var searchInputValue = searchInput.value;
    //this is the url that will need to be fetched to return the correct data
    var cityQuery = APIweather + 'vancouver' + '&units=imperial&appid=d22455c31574a84b22d1c94f4c33f19c';
    //fetch request to fetch the correct url (ex. api/vancouverWA)
    fetch(oneCall)
    //then with the response from the fetch request, do this
    .then(function (response) {
        //return the request in json format
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        
        console.log('=============')
        
        console.log(data.daily[1].dt + ' this is tomorrows Unix time')
        // convert UNIX time to correct formatting
        //take the daily date time (unix number)
        let timeUNIX = data.daily[1].dt
        //put it through this moment method to return a nicely formatted MM/DD/YYYY day
        let testmoment = moment.unix(timeUNIX).format('L');
        console.log(testmoment + ' this is the UNIX number transformed into mm/dd/yyyy')

        console.log(data.daily[1].temp.max + ' this is the temp in farenheittt')

        console.log(data.current.uvi + ' this is the current UVI baby')
        console.log('=============')
        console.log(data.current.temp)


        // var temp = data.main.temp;
        // tempToday.textContent = 'Temp: ' + temp + ' \xB0F'
        // //wind
        // console.log(data.wind.speed + ' MPH')
        // //humidity
        // console.log(data.main.humidity + '%')

    })

    };

    searchCity();

    
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
        todayName.textContent = newBtn.value;
    })
    
    
    //submit button takes the value (city) that was entered into the search bar. needs to populate that info into the container
    //then run api function to pull data into container

   
    