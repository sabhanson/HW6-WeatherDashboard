var submitBtn = $(".submit-btn");
var mainContainer = $("#right-container");
var forecastContainer = $(".forecast-container");
var searchInput = $(".search-bar");

// VARIABLES FOR TODAY FORECAST CONTAINER
const cityNameDate = $(".city-name-date");
const todayDate = $(".today-date");
const todayEmoji = $(".today-emoji");
const todayTemp = $(".today-temp");
const todayWind = $(".today-wind");
const todayHumid = $(".today-humid");

// WHEN A USER CLICKS THE SUBMIT BUTTON
submitBtn.on("click", function () {
  // empties the forecast container so it doesn't repeat each time the submit button is clicked
  forecastContainer.empty();
  var searchBar = $(".search-bar").val();
  // THE TEXT CONTENT OF CITYNAME WILL BE SET TO THE CITY THAT WAS SEARCHED
  if (searchBar == "") {
    window.alert("please enter a city name in the searchbar");
  } else {
    // cityName.textContent = searchBar.value;
    mainContainer.removeClass("hide");

    // FIRST FETCH REQUEST IS USING THE LAT AND LONG OF THE SEARCHED CITY TO RETURN VALUES FROM THE SECOND API CALL
    function latLongCall() {
      //this is the url that will need to be fetched to return the correct data
      var weatherAPI =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchBar +
        "&units=imperial&appid=d22455c31574a84b22d1c94f4c33f19c";
      //fetch request to fetch the correct url (ex. api/vancouverWA)
      fetch(weatherAPI)
        //then with the response from the fetch request, do this
        .then(function (response) {
          //return the request in json format
          return response.json();
        })
        .then(function (data) {
            console.log(data)
          // SETS THE DISPLAYED CITY NAME TO THE ONE THAT WAS SEARCHED
          let formattedTime = moment.unix(data.dt).format("L");
          cityNameDate.text(data.name + ` (` + formattedTime + `)`);
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
          console.log(latitude, longitude);
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
  }
});
