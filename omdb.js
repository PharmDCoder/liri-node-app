//importing necessary files
var axios = require("axios");
var fs = require("fs");

// Create the Movie constructor
var Movie = function () {
    // divider will be used as a spacer between the tv data we print in log.txt
    var divider = "\n------------------------------------------------------------\n\n";

    // findMovie takes in the name of a movie and searches the OMDB API
    this.findMovie = function (movieName) {
        //create the query url
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        //use npm axios to access the OMDB API
        axios.get(queryUrl).then(function (response) {
            // Place the response.data into a variable, jsonData.
            var jsonData = response.data;
            // movieData ends up being the string containing the movie data we will print to the console
            var movieData = [
                "Title of the movie: " + jsonData.Title,
                "Year the movie came out: " + jsonData.Year,
                "IMDB Rating of the movie: " + jsonData.Rated,
                "Rotten Tomatoes Rating of the movie: " + jsonData.Ratings[1].Value,
                "Country where the movie was produced: " + jsonData.Country,
                "Language of the movie: " + jsonData.Language,
                "Plot of the movie: " + jsonData.Plot,
                "Actors in the movie: " + jsonData.Actors
                //creates line breaks to read more easily in console
            ].join("\n\n");

            // Append movieData and the divider to log.txt, print movieData to the console
            fs.appendFile("log.txt", movieData + divider, function (err) {
                if (err) throw err;
                console.log(movieData);
            });
        });
    };
}

//allow this js file to be exported globally and used in liri.js
module.exports = Movie;
