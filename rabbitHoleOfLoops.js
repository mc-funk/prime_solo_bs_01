var apikey = '8e59aef0a8bcad6ac1ccbb6c83bd9533ff6d71d5'; // Put your API key here
var i;
var j;
var k;
var rowCount = 0;
var searchTerm;
var adjust = 0;
var removed = [];
var removedArray;

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log($(".searchResults .removed"));
    //$(".searchResults .removed").each(function () {
    //    removed.push($(this).data("index"));
    //    console.log("removed in callback for children: ", removed);
    //    console.log("result of child search for removed: ", $(".searchResults").children(".removed"));
    //    removedArray = results;
    //});
    $('.searchResults').empty();
    rowCount = 0;
    //console.log(results);
    for (i = 0; i < 9; i++) {
    //    console.log("i loop entered");
    //   console.log("the length of removed is: " + removed.length);
    //    for (k = 0; k < removed.length; k++) {
    //        console.log("k loop entered");
    //        if (i == removed[k]) {
    //            adjust = removed.length;
    //            console.log("adjust++ to equal" + adjust);
    //        }
    //            console.log("removed[k]: " + removed[k]);
    //            console.log(i + "is equal to removed:" + (i == removed[k]));
                j = i - adjust;
                if (j % 3 == 0) { //check to see if game should be start of a new row, based on j
                    rowCount++;
                    $(".searchResults").append("<div class='row' id='row" + rowCount + "'></div>");
                }
                $("#row" + rowCount).append(
                    "<div data-index=" + i + " class='result col-md-4 well' id='result" + i + "'></div>");
                $("#result" + i).append(
                    "<div class='hidden-sm hidden-xs'><img src='" + results[i].image.small_url + "' ></div>");
                $("#result" + i).append(
                    "<p class='lead gameTitle'>" + results[i].name + "</p>");
                $("#result" + i).append(
                    "<p>Release Date: " + results[i].original_release_date + "</p>");
                $("#result" + i).append(
                    "<p>" + results[i].deck + "</p>");
                $("#result" + i).append(
                    "<div class='btn btn-default btn-sm removeBtn'>Remove Title</div>");
    //        } else {

    //        }
        }
    }

$(document).ready(function() {
    //when search is entered, include:     removed = null;
    searchTerm = 'smash';
    console.log(search(searchTerm));
	$('.searchResults').on("click", ".removeBtn", function () {
        $(this).parent(".result").fadeOut(300).addClass("removed");
        console.log("data(index) of removed: " + $(this).parent(".result").data("index"));
        //console.log(removedArray);
        //searchResults(removedArray);
    })
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
//DONE: Each title should be in a well that has an overridden color in your own stylesheet.
//DONE: The image should only display on LG and MD displays and should hide for SM and XS displays.
//DONE: The title should be in a p tag and have a lead class.
//DONE:  Finally, include a button that has the bootstrap styling to make it small with the success styling.This button should remove the entire game title from the page (the content need not update in the html page to adjust rows)