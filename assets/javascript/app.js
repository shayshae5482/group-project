var cuisineChoice;
var zomatoCityID;

$(document).ready(function () {
    $(".attribution").hide();

    // Initial array of food choices, along with Zomato ID
    var cuisines = ["BBQ", "Cajun", "Chicken", "Chinese", "Deli", "Greek", "Hamburgers", "Italian", "Japanese", "Mediterranean", "Mexican", "Pizza", "Thai", "Vietnamese", "Wings"];

    //Array of cities to choose from, along with Zomato ID
    var dfwCities = [{
        name: "Allen",
        cityID: "10980",
    }, {
        name: "Arlington",
        cityID: "10981",
    }, {
        name: "Dallas",
        cityID: "276",
    }, {
        name: "Denton",
        cityID: "9244",
    }, {
        name: "Fort Worth",
        cityID: "10978",
    }, {
        name: "Keller",
        cityID: "10996",
    }, {
        name: "McKinney",
        cityID: "11001",
    }, {
        name: "Plano",
        cityID: "11003",
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
        $("#stay-in-tbody").empty();

        displayRecipes();
        $(".attribution").show();



    })

    //function to grab city id from zomato and store it in a var
    $(".city-btn").on("click", function () {
        for (var j = 0; j < dfwCities.length; j++) {

            // Then dynamically generates buttons for each cuisines in the array
            // zomatoCityID.attr("data-id", dfwCities[j].cityID);
            // console.log(dfwCities[j].cityID);
            zomatoCityID = $(this).attr("data-id");

        }
        $('.item').empty();
        displayRestaurants();
    })

    function resetResults() {
        $('.item').empty();
        $("#stay-in-tbody").empty();

    }

    // on submit
    $("#submit-button").on("click", function () {
        resetResults()
    })

})


$("#reset-button").on("click", function () {

    // clears value from button
    $("#go-out").trigger("reset");
});


function displayRestaurants() {

    var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + zomatoCityID + "&entity_type=city&q=" + cuisineChoice;

    $.ajax({
        type: "GET",
        headers: { "X-Zomato-API-Key": "dfd74805716eb9ecd34335e236792f0c" },
        url: queryURL,
        success: function (response) {

            var results = response.restaurants;
            console.log(results);

            var limit = 10;
            if (results.length < 10) {
                limit = results.length;
            }
            function showResults() {
                for (var i = 0; i < limit; i++) {


                    var restaurantAddress = $(".item");
                    var location = results[i].restaurant.location.address;

                    var restaurantNameforHTML = $(".item");
                    var restaurantName = results[i].restaurant.name;

                    console.log(location);
                    var pOne = $("<a href='map.html?address=" + results[i].restaurant.location.address + "'>").text(location);
                    restaurantAddress.prepend(pOne);
                    pOne.addClass("restaurants-location");


                    var pTwo = $("<h3>").text("Restaurant: " + restaurantName);
                    restaurantNameforHTML.prepend(pTwo);
                    pTwo.addClass("restaurants");

                }
            }
            if ($(".item").empty()) {
                showResults();
            }

            if (limit == 0) {
                console.log("another test");
                var noResults = $(".item");
                var pThree = $("<h3>").text("Sorry this city doesn't have a restaurant with that cuisine. Try another cuisine.");
                noResults.prepend(pThree);
            }
        }
    });
}


// YUMMLY (STAY-IN DIV)
function displayRecipes() {

    var yummlyAPIkey = "d246cc7b49fa9a139f8dbcbac1a815c2";
    var yummlyAppID = "3fce4689";

    var yummlyQueryURL = "https://api.yummly.com/v1/api/recipes?_app_id=" + yummlyAppID + "&_app_key=" + yummlyAPIkey + "&q=" + cuisineChoice + "&allowedCuisine[]=cuisine^cuisine-" + cuisineChoice;


    $.ajax({
        url: yummlyQueryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            // create a table with links and photos
            var yummlyResults = response.matches;

            for (var i = 0; i < 9; i++) {

                var newRow = $("<tr>").append(
                    $("<td>").html("<a href='https://www.yummly.com/recipe/" + yummlyResults[i].id + "'>" + yummlyResults[i].recipeName + "</a>"),
                    $("<td>").text(yummlyResults[i].sourceDisplayName),
                    $("<td>").html("<img src='" + yummlyResults[i].smallImageUrls[0] + "'>"),
                );

                $("#stay-in-tbody").append(newRow);
            };
        });
};





