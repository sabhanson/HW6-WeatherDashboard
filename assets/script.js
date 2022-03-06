const submitBtn = $(".submit-btn"); // submit button
var mainContainer = $("#right-container");
var forecastContainer = $(".forecast-container");
var searchInput = $(".search-bar");
var prevSearches = $(".buttons");
const cityNameAndDate = $(".city-name-and-date"); // h2 that displays ex. "Portland (03/05/2022)"
const todayEmoji = $(".today-emoji"); // img tag that displays today's forecast emoji
const todayTemp = $(".today-temp"); // p tag that displays today's temperature
const todayWind = $(".today-wind"); // p tag that displays today's wind speed
const todayHumid = $(".today-humid"); // p tag that displays today's humidity rating

// TODO: add media queries on the five day forecast cards fontsize
// TODO: restructure functions, what needs to be nested in what??

// on page load, any previously searched cities appear in the buttons
// on previous city button click, run both fetch requests
// on submit, need to run a function to fetch from the 1st api
// once the first fetch is completed, need to run the 2nd api fetch

init();

function init() {
  var searchedButton = $("<button>").addClass("placeholderBtn");
  var pastSearch = JSON.parse(localStorage.getItem("newCity"));
  searchedButton.value = pastSearch;
  prevSearches.append($(searchedButton));
  console.log(localStorage);
  //load previously searched buttons
}

submitBtn.on("click", function () {
  // when the submit button is clicked
  forecastContainer.empty(); // the forecast container is emptied so it doesn't repeat itself
  var searchBar = $(".search-bar").val(); // variable for the the city "" that was searched
  if (searchBar == "") {
    // if the search bar is empty when submit is clicked
    window.alert("please enter a city name in the searchbar"); // the user will be alerted to enter a city
  } else {
    // if the search is successful then it can move on to the next steps
    mainContainer.removeClass("hide"); // displays the container to show all of the weather information

    function latLongCall() {
      // this function completes the first fetch request to return specified data
      var weatherAPI =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchBar +
        "&units=imperial&appid=d22455c31574a84b22d1c94f4c33f19c"; //this is the api url for this fetch request, it takes in the user's search input
      fetch(weatherAPI) // fetch request to the URL of the user's chosen city
        .then(function (response) {
          // then
          //return the request in json format
          return response.json();
        })
        .then(function (data) {
          // SETS THE DISPLAYED CITY NAME TO THE ONE THAT WAS SEARCHED
          let formattedTime = moment.unix(data.dt).format("L");
          cityNameAndDate.text(data.name + ` (` + formattedTime + `)`);
          // SETS THE FORECAST EMOJI
          todayEmoji.attr(
            "src",
            `http://openweathermap.org/img/wn/` + data.weather[0].icon + `.png`
          );
          // SETS THE TEMPERATURE FOR TODAY
          todayTemp.text(`Temp: ` + data.main.temp + " \xB0F");
          // SETS THE WIND SPEED FOR TODAY
          todayWind.text(`Wind: ` + data.wind.speed + `mph`);
          // SETS THE HUMIDITY % FOR TODAY
          todayHumid.text(`Humidity: ` + data.main.humidity + "%");
          // GRABS THE UNIX FOR TODAY AND FORMATS IT TO XX/XX/XXXX FORMAT

          // SETS VARIABLES FOR THE LATITUDE AND LONGITUDE OF THE CITY THAT WAS SEARCHED
          let latitude = data.coord.lat;
          let longitude = data.coord.lon;
          fetch(
            // FETCH REQUEST USING THE LATITUDE AND LONGITUDE
            `https://api.openweathermap.org/data/2.5/onecall?lat=` +
              latitude +
              `&lon=` +
              longitude +
              `&units=imperial&appid=d22455c31574a84b22d1c94f4c33f19c`
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              // SELECT THE UV INDEX
              let todayUVIndex = $(".UV-number");
              let currentUVI = data.current.uvi;
              todayUVIndex.text(currentUVI);
              if (currentUVI >= 0 && currentUVI <= 2.9999) {
                todayUVIndex.addClass("low-UV");
              } else if (currentUVI >= 3 && currentUVI <= 5.9999) {
                todayUVIndex.addClass("moderate-UV");
              } else if (currentUVI >= 6 && currentUVI <= 7.9999) {
                todayUVIndex.addClass("high-UV");
              } else if (currentUVI >= 8 && currentUVI <= 10.9999) {
                todayUVIndex.addClass("very-high-UV");
              } else {
                todayUVIndex.addClass("extreme-UV");
              }
              // for loop to create each forecast day card
              for (let i = 1; i < 6; i++) {
                // jquery creating new HTML elements and adding the appropriate classes
                var eachDayCard = $("<div>").addClass("day-card");
                var eachDate = $("<h3>").addClass("each-date");
                var eachEmoji = $("<img>").addClass("each-emoji");
                var eachTemp = $("<p>").addClass("each-temp");
                var eachWind = $("<p>").addClass("each-wind");
                var eachHumid = $("<p>").addClass("each-humid");
                // formatting the UNIX time data into xx/xx/xxxx format
                eachDate.text(moment.unix(data.daily[i].dt).format("L"));
                // setting the source of each emoji image to the icon from the data
                eachEmoji.attr(
                  "src",
                  `http://openweathermap.org/img/wn/` +
                    data.daily[i].weather[0].icon +
                    `.png`
                );
                // setting the text of the temp p tag using the temp data
                eachTemp.text(`Temp: ` + data.daily[i].temp.max + ` \xB0F`);
                // setting the text of the wind p tag using the wind data
                eachWind.text(`Wind: ` + data.daily[i].wind_speed + `mph`);
                // setting the text of the humidity p tag using the wind data
                eachHumid.text(`Humidity: ` + data.daily[i].humidity + `%`);
                // appending all of the new card elements to the card itself
                eachDayCard.append(
                  eachDate,
                  eachEmoji,
                  eachTemp,
                  eachWind,
                  eachHumid
                );
                // appending all of the day cards to the card container
                forecastContainer.append(eachDayCard);
              }
            });
        });
    }
    latLongCall();

    localStorage.setItem("newCity", JSON.stringify(searchBar));
    var newBtn = $("<button>");
    var btnContainer = $(".buttons");
    newBtn.addClass("placeholderBtn");
    newBtn.text(searchBar);
    btnContainer.append(newBtn);
  }

  newBtn.on("click", function () {
    forecastContainer.empty();
    latLongCall(newBtn.text());
  });
});
