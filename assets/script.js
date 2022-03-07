const submitBtn = $(".submit-btn"); // submit button to submit a new search
const mainContainer = $("#right-container"); // the main container that renders today's forecast and next 5 days
const fiveDayForecastContainer = $(".fiveday-forecast-container"); // the container that renders the 5 day cards
const searchInput = $(".search-bar"); // the input field where users search for cities
const prevSearches = $(".buttons"); // the container that holds previously searched cities
const cityNameAndDate = $(".city-name-and-date"); // h2 that displays ex. "Portland (03/05/2022)"
const todayEmoji = $(".today-emoji"); // img tag that displays today's forecast emoji
const todayTemp = $(".today-temp"); // p tag that displays today's temperature
const todayWind = $(".today-wind"); // p tag that displays today's wind speed
const todayHumid = $(".today-humid"); // p tag that displays today's humidity rating
const todayUVIndex = $(".UVIndex-number"); // p tag that displays today's uv index number

// TODO: add media queries on the five day forecast cards fontsize
// TODO: restructure functions, what needs to be nested in what??

// on page load, any previously searched cities appear in the buttons
// on previous city button click, run both fetch requests
// on submit, need to run a function to fetch from the 1st api
// once the first fetch is completed, need to run the 2nd api fetch

// function to run on the UVIndex
function UVIndexColor(currentUVIndex, todayUVIndex) {
  if (currentUVIndex >= 0 && currentUVIndex <= 2.9999) {
    todayUVIndex.addClass("low-UV");
  } else if (currentUVIndex >= 3 && currentUVIndex <= 5.9999) {
    todayUVIndex.addClass("moderate-UV");
  } else if (currentUVIndex >= 6 && currentUVIndex <= 7.9999) {
    todayUVIndex.addClass("high-UV");
  } else if (currentUVIndex >= 8 && currentUVIndex <= 10.9999) {
    todayUVIndex.addClass("very-high-UV");
  } else {
    todayUVIndex.addClass("extreme-UV");
  }
}

function saveCity() {
  var newCity = $(".search-bar").val();
  console.log(newCity);

  if (localStorage.getItem("tryThis") == null) {
    localStorage.setItem("tryThis", "[]");
  } else {
    var oldList = JSON.parse(localStorage.getItem("tryThis"));
    console.log(oldList);
    oldList.push(newCity);

    localStorage.setItem("tryThis", JSON.stringify(oldList));
    console.log(localStorage);
  }
}

function showCities() {
  if (localStorage.getItem("cityList") != null) {
    console.log(localStorage);
  } else {
    console.log("nothing in localstorg");
  }
}
showCities();

submitBtn.on("click", function () {
  saveCity();

  // when the submit button is clicked
  fiveDayForecastContainer.empty(); // the forecast container is emptied so it doesn't repeat itself
  var searchBar = $(".search-bar").val(); // variable for the the city "" that was searched
  if (searchBar == "") {
    // if the search bar is empty when submit is clicked
    window.alert("please enter a city name in the searchbar"); // the user will be alerted to enter a city
  } else {
    // if the search is successful then it can move on to the next steps
    mainContainer.removeClass("hide"); // displays the container to show all of the weather information
    function latLongCall() {
      // function that handles the first fetch request
      var weatherAPI =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchBar +
        "&units=imperial&appid=d22455c31574a84b22d1c94f4c33f19c"; //this is the api url for this fetch request, it takes in the user's search input
      fetch(weatherAPI) // fetch request to the URL of the user's chosen city
        .then(function (response) {
          // then take the response
          return response.json(); // and return json
        })
        .then(function (data) {
          // then take the data
          let formattedTime = moment.unix(data.dt).format("L"); // formats the data.dt since it is UNIX formatted and needs to be reformatted
          cityNameAndDate.text(data.name + ` (` + formattedTime + `)`); // sets the displayed city name and date from the fetch data
          todayEmoji.attr(
            "src",
            `http://openweathermap.org/img/wn/` + data.weather[0].icon + `.png` // sets the forecast emoji for today from the data
          );
          todayTemp.text(`Temp: ` + data.main.temp + " \xB0F"); // sets the temp for today from the data
          todayWind.text(`Wind: ` + data.wind.speed + `mph`); // sets the wind for today from the data
          todayHumid.text(`Humidity: ` + data.main.humidity + "%"); // sets the humidity for today from the data
          let latitude = data.coord.lat; // sets a variable for the latitude to be used in the second fetch request
          let longitude = data.coord.lon; // sets a variable for the longitude to be used in the second fetch request
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=` + // fetch request using the latitude and longitude from the first request to receive the rest of the data
              latitude +
              `&lon=` +
              longitude +
              `&units=imperial&appid=d22455c31574a84b22d1c94f4c33f19c`
          )
            .then(function (response) {
              // then take the response
              return response.json(); // and return json
            })
            .then(function (data) {
              // then take the data from the fetch request
              let currentUVIndex = data.current.uvi; // save the data uv index
              todayUVIndex.text(currentUVIndex); // set the uv index for today
              UVIndexColor(currentUVIndex, todayUVIndex); // running the function on today's uv index number to give it the appropriate background color with css class

              // for loop to create each 5 day forecast card
              for (let i = 1; i < 6; i++) {
                // creates an h3 tag for each day's calendar date , adds the class, sets the text content to the data returned from api fetch
                var eachDate = $("<h3>")
                  .addClass("each-date")
                  .text(moment.unix(data.daily[i].dt).format("L"));
                // creates an img tag for each day's forecast emoji, add the class, sets the src to the emoji from the api fetch data
                var eachEmoji = $("<img>")
                  .addClass("each-emoji")
                  .attr(
                    "src",
                    `http://openweathermap.org/img/wn/` +
                      data.daily[i].weather[0].icon +
                      `.png`
                  );
                // creates a p tag for each day's temperature, add the class, sets the text content to the data from api fetch
                var eachTemp = $("<p>")
                  .addClass("each-temp")
                  .text(`Temp: ` + data.daily[i].temp.max + ` \xB0F`);
                // cretes a p tag for each day's wind, add the class, set the text content to the data from api fetch
                var eachWind = $("<p>")
                  .addClass("each-wind")
                  .text(`Wind: ` + data.daily[i].wind_speed + `mph`);
                // creates a p tag for each day's humidity, add the class, set the text content to the data from api fetch
                var eachHumid = $("<p>")
                  .addClass("each-humid")
                  .text(`Humidity: ` + data.daily[i].humidity + `%`);
                // creates a div for each day, add the class, append all of the elements we created above
                var eachDayCard = $("<div>")
                  .addClass("day-card")
                  .append(eachDate, eachEmoji, eachTemp, eachWind, eachHumid);
                // append all of the day cards to the card container
                fiveDayForecastContainer.append(eachDayCard);
              }

              // var newBtn = $("<button>");
              // var btnContainer = $(".buttons");
              // newBtn.addClass("placeholderBtn");
              // newBtn.text(searchBar);
              // btnContainer.append(newBtn);
              // newBtn.on("click", function () {
              //   fiveDayForecastContainer.empty();
              //   latLongCall(newBtn.text());
              // });
            });
        });
    }

    // function init() {
    //   var new_data =
    //   var searchedButton = $("<button>").addClass("placeholderBtn");
    //   var pastSearch = JSON.parse(localStorage.getItem("newCity"));
    //   searchedButton.value = pastSearch;
    //   prevSearches.append($(searchedButton));
    //   console.log(localStorage);
    //   //load previously searched buttons
    // }

    latLongCall();
    // init();
  }
});
