function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 36.7970, lng: -95.7767 },
        zoom: 4,
    });

    var input = document.getElementById('pac-input');

    var autocomplete = new google.maps.places.Autocomplete(
        input, { placeIdOnly: true });
    autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var geocoder = new google.maps.Geocoder;
    var marker = new google.maps.Marker({
        map: map
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        var place = autocomplete.getPlace();

        if (!place.place_id) {
            return;
        }
        geocoder.geocode({ 'placeId': place.place_id }, function (results, status) {

            if (status !== 'OK') {
                window.alert('Geocoder failed due to: ' + status);
                return;
            }
            map.setZoom(11);
            map.setCenter(results[0].geometry.location);
            // Set the position of the marker using the place ID and location.
            marker.setPlace({
                placeId: place.place_id,
                location: results[0].geometry.location
            });
            marker.setVisible(true);
            infowindowContent.children['place-name'].textContent = place.name;
            infowindowContent.children['place-id'].textContent = place.place_id;
            infowindowContent.children['place-address'].textContent =
                results[0].formatted_address;
            infowindow.open(map, marker);
        });
    });
}


var cuisineChoice;

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
    cuisineChoice = $(this).attr("data-name");

    // logs to console
    console.log("Cuisine choice: " + cuisineChoice);
    displayRestaurants();
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

// var userKey = '281d1810ef0a4d12651256e7bd43fad2';

// var queryURL = userKey + "https://developers.zomato.com/api/v2.1/cuisines";

// //Performing GET response to get Zomato cuisines in a particular city. 

// $.ajax({

//   url: queryURL + "set cuisines=10" + "city_id",
//   method: "GET"
//   }).then(function(response) {

//       //test to see if the restuarants populate or if it's a hot mess//
//       console.log(response);

//       //if it consoles correctly, then use the code below to populate in the div
//       //$("#go-out").text(JSON.stringify(response));
//   });
// }


    // yummly API call

    var yummlyAPIkey = "d246cc7b49fa9a139f8dbcbac1a815c2";
    var yummlyAppID = "3fce4689";

    var yummlyQueryURL = "https://api.yummly.com/v1/api/recipes?_app_id=" + yummlyAppID + "&_app_key=" + yummlyAPIkey + "&q=" + cuisineChoice; 

    $.ajax({
    url: yummlyQueryURL,
    method: "GET"
    })
    
    .then(function(response) {

        //test to see if the restuarants populate or if it's a hot mess//
        console.log(response);

        //if it consoles correctly, then use the code below to populate in the div
        //$("#go-out").text(JSON.stringify(response));

        console.log(response.matches[0].recipeName);
    });
};

/* Notes on yummly api

How to get to recipeName:
response.matches[i].recipeName

Big image?
response.matches[i].imageUrlsBySize.90

Thumbnail
response.matches[i].smallImageUrls[0]

Link to recipe:
https://www.yummly.com/recipe/ + matches[0].id

*/ 
