$(document).ready(function () {
  // Initial array of food choices
  var cuisines = ["Mexican", "Italian", "Chinese", "Barbeque", "Wings", "Hamburgers", "Vegetarian", "American", "Thai", "Deli", "Greek", "Fast Food", "Pizza"];

  // Looping through the array of food cuisines
  for (var i = 0; i < cuisines.length; i++) {

    // Then dynamically generates buttons for each cuisines in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var cuisineButton = $("<button>");
    // Adding a class of cuisine-btn to our button
    cuisineButton.addClass("cuisine-btn");
    // Adding a data-attribute
    cuisineButton.attr("data-name", cuisines[i]);
    // Providing the initial button text
    cuisineButton.text(cuisines[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(cuisineButton);
  }

  //Adding moment.js to get clock at the top of the screen
  var currentTime = moment();
  //displays current time on the jumbotron
  $('#clock').html(moment(currentTime).format('MMMM D. YYYY LT'));

  function update() {
    $('#clock').html(moment().format('MMMM D. YYYY LT'));
  }
  setInterval(update, 60000);


  // Button on-click
  $(".cuisine-btn").on("click", function(){
    // grabs value from button
    // stores it in a variable
    var cuisineChoice = $(this).attr("data-name");

    // logs to console
    console.log("Cuisine choice: " + cuisineChoice);
  })

  // on submit
  $("#submit-button").on("click", function(){
    event.preventDefault();
    // grabs input value
    // stores in varaible
    var userLocation = $("#location-input").val().trim()

    // logs to console
    console.log("Location: " + userLocation);

  })

})


function displayRestaurants() {

  //use the this method to display cuisine type
  //var goOut = $(this).attr("#go-out");

//Zomato API key//

var userKey= '281d1810ef0a4d12651256e7bd43fad2';

var queryURL= userKey + "https://developers.zomato.com/api/v2.1/cuisines";

//Performing GET response to get Zomato cuisines in a particular city. 

$.ajax({

  url: queryURL + "set cuisines=10" + "city_id",
  method: "GET"
  }).then(function(response) {

      //test to see if the restuarants populate or if it's a hot mess//
      console.log(response);

      //if it consoles correctly, then use the code below to populate in the div
      //$("#go-out").text(JSON.stringify(response));
  });
}