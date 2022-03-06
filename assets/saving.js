
//localStorage list of previously searched locations, when they are clicked, city is reentered into the search bar to repopulate info on the page
    //localstorage will store previously searched city
    //create a new button from that search
    //button click, fetch function is run
    //


var placeholdBtn = document.querySelector('.placeholderBtn');
//create a button element for previously searched city
var prevSearchBtn = document.createElement("button");
var buttonContainer = document.querySelector(".buttons");



    // WHEN A USER CLICKS THE SUBMIT BUTTON
    submitBtn.addEventListener('click', function() {
        // THE TEXT CONTENT OF 
        todayName.textContent = searchBar.value;
        var mainContainer = document.querySelector('#right-container');
        mainContainer.classList.toggle("hide-show");
        // localStorage.setItem("newCity", saveCity);
        // var newBtn = document.createElement("button");
        // newBtn.type = 'button',
        // newBtn.innerHTML = saveCity;
        // newBtn.className = "placeholderBtn"
        //this is working to append the button to the list of buttons
        // buttonContainer.appendChild(newBtn);
        // localStorage.getItem("newCity")
    })
    

    // newBtn.addEventListener('click', function () {
    //     todayName.textContent = newBtn.value;
    // })
    
    
    //submit button takes the value (city) that was entered into the search bar. needs to populate that info into the container
    //then run api function to pull data into container

   
    