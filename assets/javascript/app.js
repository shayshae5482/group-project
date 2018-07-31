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

})
