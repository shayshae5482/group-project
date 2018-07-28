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

$(document).ready(function () {
    // Initial array of food choices
    var cuisines = ["Mexican", "Italian", "Chinese", "Barbeque", "Wings", "Hamburgers", "Vegetarian", "American", "Thai", "Deli", "Greek"];
  
    // Function for displaying cuisine button
    function renderButtons() {
  
 
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
    }
})
  

