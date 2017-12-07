$(document).ready(function() {

  	var gifArray= ["car fail", "plane fail", "train fail", "skateboard fail", "cat fail", "dog fail", "walmart fail"];

  	//Retrieve text from user
  	$("#add-search-button").on("click", function(event) {
      event.preventDefault();
      var newGif = $("#vehicle-type").val().trim() + " fail";
      //store text in array
      gifArray.push(newGif);
      $("#vehicle-type").val("");
      console.log(gifArray);
      //clear previous storage in div before calling renderButtons
      $("#gif-buttons").html("");
      //call button render function
      renderButtons();
    });


  	//use gifArray data to construct buttons via loop.
  	//store loop that creates button in a render function that runs every time the submit button is pressed.
  	function renderButtons(){
	  	for (var i = 0; i < gifArray.length; i++) {
			var newButton = $("<button>");
		    newButton.addClass("getGifs");
		    newButton.text(gifArray[i]);
	       	newButton.attr("data-name", gifArray[i]);
	       	$("#gif-buttons").append(newButton);
	       	console.log("renderButtons called");
	       	console.log(newButton);
	  	}
	};

	 renderButtons();



	 //rettrieve data from giphy api
	$("#gif-buttons").on("click", ".getGifs", function() {
		var searchTerm = $(this).attr("data-name");
		console.log("you're searching for: " + searchTerm);
	    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

	    $.ajax({
	 		url: queryURL,
	  		method: "GET"
		})
		.done(function(response) {
	  	var results = response.data;

	  	$("#gif-store").empty();

		  	//output gif results
		    for (var i = 0; i < results.length; i++) {
			    var gifDiv = $("<div class='item'>");

			    var rating = results[i].rating;

			    var rateDiv = $("<div>").text("Rating: " + rating);

			    var image = $("<img class= 'gif'>");
			    image.attr("data-state", "still");
			   	image.attr("src", results[i].images.fixed_height_still.url);
			   	image.attr("data-still", results[i].images.fixed_height_still.url);
			   	image.attr("data-animate", results[i].images.fixed_height.url);

			    gifDiv.prepend(rateDiv);
			    gifDiv.prepend(image);

			    $("#gif-store").prepend(gifDiv);
		 	}
		});
	});

	$("#gif-store").on("click", ".gif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
	
});
