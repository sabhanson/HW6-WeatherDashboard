const submitBtn = $(".submit-btn");
const mainContainer = $("#right-container");
const fiveDayForecastContainer = $(".fiveday-forecast-container");
const searchInput = $(".search-bar");
const prevSearches = $(".buttons");
const cityNameAndDate = $(".city-name-and-date");
const todayEmoji = $(".today-emoji");
const todayTemp = $(".today-temp");
const todayWind = $(".today-wind");
const todayHumid = $(".today-humid");
const todayUVIndex = $(".UVIndex-number");

// this controls the color of the UV index button element
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

function latLongCall(param) {
  // var searchBar = searchInput.val();

  // function that handles the first fetch request
  var weatherAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    param +
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
        });
    });
}

submitBtn.on("click", function () {
  var searchBar = searchInput.val();
  latLongCall(searchBar);

  if (localStorage.getItem("searchedCities") == null) {
    localStorage.setItem("searchedCities", `[]`);
  } else {
    var oldList = JSON.parse(localStorage.getItem("searchedCities"));
    console.log(oldList);
    oldList.push(searchBar);
    localStorage.setItem("searchedCities", JSON.stringify(oldList));
    showCities();
    // location.reload();
  }

  // when the submit button is clicked
  fiveDayForecastContainer.empty(); // the forecast container is emptied so it doesn't repeat itself
  var searchBar = $(".search-bar").val(); // variable for the the city "" that was searched
  if (searchBar == "") {
    // if the search bar is empty when submit is clicked
    window.alert("please enter a city name in the searchbar"); // the user will be alerted to enter a city
  } else {
    // if the search is successful then it can move on to the next steps
    mainContainer.removeClass("hide"); // displays the container to show all of the weather information
  }
});

// make buttons for all of the previously searched cities
function showCities() {
  if (localStorage.getItem("cityList") != null) {
    var oldCities = JSON.parse(localStorage.getItem("cityList"));
    console.log(oldCities);

    // run a loop to iterate through each element in localstorage
    for (let i = 0; i < oldCities.length; i++) {
      var newCityBtn = $("<button>")
        .addClass("placeholderBtn")
        .text(oldCities[i]);
      console.log(oldCities[i]);
      var btnContainer = $(".buttons");
      btnContainer.append(newCityBtn);
      location.reload();
    }
    document.querySelectorAll(".placeholderBtn").forEach((city) => {
      city.addEventListener("click", function () {
        console.log(city.textContent);
        fiveDayForecastContainer.empty();
        latLongCall(param);
        mainContainer.removeClass("hide");
        var param = city.textContent;
      });
    });
  }
}

function init() {
  var oldCities = JSON.parse(localStorage.getItem("searchedCities"));
  console.log(oldCities);
  for (let i = 0; i < oldCities.length; i++) {
    var newCityBtn = $("<button>")
      .addClass("placeholderBtn")
      .text(oldCities[i]);
    console.log(oldCities[i]);
    var btnContainer = $(".buttons");
    btnContainer.append(newCityBtn);
  }
  document.querySelectorAll(".placeholderBtn").forEach((city) => {
    city.addEventListener("click", function () {
      console.log(city.textContent);
      fiveDayForecastContainer.empty();
      latLongCall(city.textContent);
      mainContainer.removeClass("hide");
    });
  });
}

window.onload = init();
