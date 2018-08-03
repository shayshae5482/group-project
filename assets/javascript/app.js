
var cuisineChoice;
var zomatoCityID;

$(document).ready(function () {
    // Initial array of food choices, along with Zomato ID
    var cuisines = ["Mexican", "Italian", "Chinese", "BBQ", "Hamburgers", "Mediterranean", "Wings", "Thai", "Pizza", "Japanese", "Chicken", "Deli", "Vietnamese", "Hamburger"];

    //Array of cities to choose from, along with Zomato ID
    var dfwCities = [{
        name: "Dallas",
        cityID: "276",
    }, {
        name: "Arlington",
        cityID: "10981",
    }, {
        name: "Fort Worth",
        cityID: "10978",
    }, {
        name: "Plano",
        cityID: "11003",
    }, {
        name: "McKinney",
        cityID: "11001",
    }, {
        name: "Denton",
        cityID: "9244",
    }, {
        name: "Southlake",
        cityID: "11010",
    }];
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

    //Looping through cities to create buttons
    for (var j = 0; j < dfwCities.length; j++) {

        // Then dynamically generates buttons for each cuisines in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var cityButton = $("<button>");
        // Adding a class of cuisine-btn to our button
        cityButton.addClass("city-btn");
        // Adding a data-attribute
        cityButton.attr("data-name", dfwCities[j].name);
        cityButton.attr("data-id", dfwCities[j].cityID);
        console.log(dfwCities[j].name);
        // Providing the initial button text
        cityButton.text(dfwCities[j].name);
        // Adding the button to the buttons-view div
        $("#cities-view").append(cityButton);
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
    $(".cuisine-btn").on("click", function () {
        // grabs value from button
        // stores it in a variable
        cuisineChoice = $(this).attr("data-name");

        // logs to console
        console.log("Cuisine choice: " + cuisineChoice);
        $("#stay-in-body").empty();

    })

    //function to grab city id from zomato and store it in a var
    $(".city-btn").on("click", function () {
        for (var j = 0; j < dfwCities.length; j++) {

            // Then dynamically generates buttons for each cuisines in the array
            // zomatoCityID.attr("data-id", dfwCities[j].cityID);
            // console.log(dfwCities[j].cityID);
            zomatoCityID = $(this).attr("data-id");
          
        }

        displayRestaurants();
        displayRecipes();
    })

function resetResults() {
    $('.item').empty();
  
}
    // on submit
    $("#submit-button").on("click", function () {
       resetResults()
    })

})




function displayRestaurants() {

    //use the this method to display cuisine type
    //var goOut = $(this).attr("#go-out");

    //Zomato API key//

    var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + zomatoCityID + "&entity_type=city&q=" + cuisineChoice;

    $.ajax({
        type: "GET",
        headers: { "X-Zomato-API-Key": "281d1810ef0a4d12651256e7bd43fad2" },
        url: queryURL,
        success: function (response) {

            var results = response.restaurants;
            console.log(results);
            
            

            for (var i = 0; i < 10; i++) {
                              
                var restaurantAddress = $(".item");
                var location = results[i].restaurant.location.address;

                var restaurantNameforHTML = $(".item");
                var restaurantName = results[i].restaurant.name;

                console.log(location);
                var pOne = $("<a href='map.html'>").text(location);
                restaurantAddress.prepend(pOne);

                var pTwo = $("<h3>").text("Restaurant: " + restaurantName);
                restaurantNameforHTML.prepend(pTwo);

            }
        }
    });


};


    // yummly API call

    var yummlyAPIkey = "d246cc7b49fa9a139f8dbcbac1a815c2";
    var yummlyAppID = "3fce4689";

    // var yummlyQueryURL = "https://api.yummly.com/v1/api/recipes?_app_id=" + yummlyAppID + "&_app_key=" + yummlyAPIkey + "&q=" + cuisineChoice;
    var yummlyQueryURL = "https://api.yummly.com/v1/api/recipes?_app_id=" + yummlyAppID + "&_app_key=" + yummlyAPIkey + "&q=" + cuisineChoice + "&allowedCuisine[]=cuisine^cuisine-" + cuisineChoice;



    $.ajax({
        url: yummlyQueryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            // // create a table with links and photos\

            var yummlyResults = response.matches;

            for (var i = 0; i < 9; i++) {

                    var newRow = $("<tr>").append(
                        $("<td>").html("<a href='https://www.yummly.com/recipe/" + yummlyResults[i].id + "'>" + yummlyResults[i].recipeName + "</a>"),
                        $("<td>").text(yummlyResults[i].sourceDisplayName),
                        $("<td>").html("<img src='" + yummlyResults[i].smallImageUrls[0] + "'>"),
                        $("</tr>")
                    );

                    $("#stay-in-tbody").append(newRow);

                    // FORMAT FOR YUMMLY ELEMENTS
                    
                    console.log("Recipe: " + yummlyResults[i].recipeName);
                    console.log("Source: " + yummlyResults[i].sourceDisplayName);
                    console.log("Link: " + "https://www.yummly.com/recipe/" + yummlyResults[i].id);
                    console.log("Thumbnail: " + yummlyResults[i].smallImageUrls[0]);
                    console.log("Rating: " + yummlyResults[i].rating);
            
            };

        });


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
