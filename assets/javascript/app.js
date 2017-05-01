$(document).ready(function() {
//Code borrowed from class examples


//Where are thirty teams are placed.
var NBATeams = ["Nets","Knicks","Lakers","Celtics","Bulls","Raptors","Warriors","Cavaliers","Spurs","Wizards","Thunder","Rockets","Magic","Hawks","Pacers","Bucks","Jazz","Clippers","Mavericks","Grizzlies","Trailblazers","Suns","Heat","Pistons","Hornets","76ers","Nuggets","Pelicans","Kings","Timberwolves"];

   // Function for displaying NBA data
      function renderButtons() {
      		console.log("help");
        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#NBAbuttons").empty();

        // Looping through the array of nba
        for (var i = 0; i < NBATeams.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("NBAteams");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", NBATeams[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(NBATeams[i]);
          // Adding the button to the HTML
          $("#NBAbuttons").append(a);
          	console.log("help");
        }
      }

      // This function handles events where one button is clicked
      $("#addNBA").on("click", function(event) {
      	console.log(NBATeams);
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var NBAteams = $("#NBA-input").val().trim();
        // The movie from the textbox is then added to our array
        NBATeams.push(NBAteams);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();

     $("button").on("click", function() {
     	console.log("test1");
      var person = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";
        	console.log(person);
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
          
          }
        });
    });
     });