//$(document).ready(function() {
//Code borrowed from class examples

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
          a.attr("data-name", NBATeams[i]);

          // Providing the button's text with a value of the movie at index i
          a.text(NBATeams[i]);
          // Adding the button to the HTML
          $("#NBAbuttons").append(a);
          
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

     $("button").click(function() {
     	console.log("test1");
      var nba = $(this).attr("data-name");
      
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        nba + "&api_key=dc6zaTOxFJmzC&limit=10";
       
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
        
          //var static = "http://media.giphy.com/media/" +  + "/200_s.gif"
         // $("button").on("click", function()
          //{})


          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;


            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.addClass("data-state");
       
            personImage.attr("src", results[i].images.fixed_height.url);
            test1 = results[i].images.fixed_height.url;
           // test2 = test1.replace("200.gif", "200_s.gif");
            //personImage.attr("src", test2);*/

            personImage.attr("src", test1.replace("200.gif", "200_s.gif"));

            //var state = $(this).attr("data-state");

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
          
          }
            $("img").click(function() {
              console.log("Hello WOrld");
              //var test2 = results[i].images.fixed_height.url;
              
              
              $(this).attr("src", test1.replace("200_s.gif", "200.gif"));
            });
          

  /*  switch (state) {
        case "animate":
          $(this).attr("data-state", "still");
          $(this).attr("src", $(this).attr("data-still"));
          break;
        case "still":
          $(this).attr("data-state", "animate");
          $(this).attr("src", $(this).attr("data-animate"));
          break;
        default:
          console.log("I'm not doin a thing!");
      }*/
        });
    });
   //  });