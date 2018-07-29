//use the preselected array of cusines created by Julie//
//    var cuisines = ["Mexican", "Italian", "Chinese", "Barbeque", "Wings", "Hamburgers", "Vegetarian", "American", "Thai", "Deli", "Greek"];

//Create a function for dumping 10 cusine results in a particular city in the "Go-Out" div//

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