var apikey = '8e59aef0a8bcad6ac1ccbb6c83bd9533ff6d71d5'; // Put your API key here
var i;
var rowCount = 0;

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);
    for (i = 0; i < 9; i++) {
        if (i % 3 == 0) { //check to see if game should be start of a new row, based on i
            rowCount++;
            $(".searchResults").append("<div class='row' id='row" + rowCount + "'></div>");
        }
        $("#row" + rowCount).append("<div class='result col-md-4 well' id='result" + i + "'></div>");
        $("#result" + i).append(
            "<p><img src='" + results[i].image.small_url + "' ></p>"
        );
        $("#result" + i).append(
            "<p class='gameTitle'>"+ results[i].name + "</p>");
        $("#result" + i).append(
            "<p>Release Date: "+ results[i].original_release_date + "</p>");
        $("#result" + i).append(
            "<p>"+ results[i].deck + "</p>");
    }

}

$(document).ready(function() {

    console.log(search('smash'));
	
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}

/*
Start with search in JavaScript*/
//TODO: Each title should be in a well that has an overridden color in your own stylesheet.
//TODO: The image should only display on LG and MD displays and should hide for SM and XS displays.
//TODO: The title should be in a p tag and have a lead class.
//TODO:  Finally, include a button that has the bootstrap styling to make it small with the success styling.
// This button should remove the entire game title from the page (the content need not update in the html page to adjust rows)