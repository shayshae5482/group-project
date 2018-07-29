//Zomato API key//

var userKey= '281d1810ef0a4d12651256e7bd43fad2';


//Performing GET response to get Zomato categories. 

var queryURL= "https://developers.zomato.com/api/v2.1/categories";

$.ajax({

    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response);
    });