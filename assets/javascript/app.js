

var test1;

//Where are thirty teams are placed.
var NBATeams = ["Nets","Knicks","Lakers","Celtics","Bulls","Raptors","Warriors","Cavaliers","Spurs","Wizards","Thunder","Rockets","Magic","Hawks","Pacers","Bucks","Jazz","Clippers","Mavericks","Grizzlies","Trailblazers","Suns","Heat","Pistons","Hornets","76ers","Nuggets","Pelicans","Kings","Timberwolves"];

   // Function for displaying NBA data
      function renderButtons() {
      		
        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#NBAbuttons").empty();

        // Looping through the array of nba
        for (var i = 0; i < NBATeams.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a data-attribute with a value of the movie at index i
          a.addClass("NBAButton");
          a.attr("data-name", NBATeams[i]);

          // Providing the button's text with a value of the movie at index i
          a.text(NBATeams[i]);
          // Adding the button to the HTML
          $("#NBAbuttons").append(a);
          
        }
      }

      // This function handles events where one button is clicked
      $("#addNBA").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var NBAteams = $("#NBA-input").val().trim();
        // The movie from the textbox is then added to our array
        NBATeams.push(NBAteams);
          $("#NBA-input").val("");
    
        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

// fetchAnimalGifs will fetch animal Gifs with the Giphy API
function fetchNBAGifs() {
  // Get the animal name from the button clicked
  var NBAName = $(this).attr("data-name");
  var NBAStr = NBAName.split(" ").join("+");

  // Construct the Giphy URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + NBAStr + 
                 "&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC";

  // Make the AJAX call to the Giphy API
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
    // Get the results array
    var dataArray = result.data;

    // Create and display div elements for each of the returned Gifs
    $("#gifs-appear-here").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("NBAGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      // Append the new Gifs to the gifPanel
      $("#gifs-appear-here").append(newDiv);
    }
  });
}

// animateAnimalGif will animate a still Gif and stop a moving Gif
function animateNBAGif() {
  // The image state will be either "still" or "animated"
  var state = $(this).find("img").attr("data-state");

  // Make the Gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

// Render the initial animal buttons when the HTML has finished loading
$(document).ready(function() {
  renderButtons();
});

// An event handler for the animal buttons to fetch appropriate Gifs
$(document).on("click", ".NBAButton", fetchNBAGifs);

// Add an event handler for the animal Gifs to make the image animate and stop
$(document).on("click", ".NBAGif", animateNBAGif);