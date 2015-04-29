var apikey = '8e59aef0a8bcad6ac1ccbb6c83bd9533ff6d71d5'; // Put your API key here
var i;
var j;
var rowCount = 0;
var searchTerm;
var adjust = 0;
var removedArray = [];


function searchCallback(results) {
    for (i = 0; i < 9; i++) {
        if ($("#result" + i).hasClass("removed")) {
            removedArray[i] = $("#result" + i).hasClass("removed")
            console.log("removed array " + i + " value: " + removedArray[i]);
        }
    }
    console.log("removed array", removedArray);
    $('.searchResults').empty();
    rowCount = 0;
    for (i = 0; i < 9; i++) {
        console.log("iteration " + i + ", removedArray value is " + removedArray[i]);
        if (removedArray[i] != true) {
            if (i % 3 == 0) { //check to see if game should be start of a new row, based on j
                rowCount++;
                $(".searchResults").append("<div class='row' id='row" + rowCount + "'></div>").hide().fadeIn(400);;
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
            $("#result" + 1)
        }
    }
}

$(document).ready(function() {

	$('.searchResults').on("click", ".removeBtn", function () {
        $(this).parent(".result").remove();
        rowCheck();
    });

    $('.searchBtn').on("click", function() {
        console.log("Click worked at all");
        console.log($(".searchField").val());
        search($("#searchField").val());
    });
});

function rowCheck() {
    for (k=1; k < rowCount + 1; k++) {
        console.log("row " + k + " has "+  $('#row' + k).children(":visible").length + " children");
        numChildren = $('#row' + k).children(":visible").length;
        if (numChildren < 3) {
            console.log("rowk+1: ", $('#row' + (k+1)).html());
            console.log("first child: ", $('#row' + (k+1)).children('.result:first').html());
            $('#row' + (k+1)).children('.result:first').detach().appendTo($('#row' + k));
        }
    }
}

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