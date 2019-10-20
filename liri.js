//importing js files
var Omdb = require("./omdb.js");
var Band = require("./bands.js");
var Spotify = require("./spotify.js");

// fs is a core Node package for reading and writing files
var fs = require("fs");

// Create a new object for each JS constructor
var movie = new Omdb();
var band = new Band();
var spotify = new Spotify();

// Grab search command line argument to determine which program to run
var search = process.argv[2];
// Joining the remaining arguments since names may contain spaces - spotify requires +
var term = process.argv.slice(3).join("+");

//this statement pulls data from a text file
if (search === "do-what-it-says") {
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // Redefining search and term variable values based on txt file 
        search = dataArr[0];
        term = dataArr[1];
        // Passing new variables through the main program function
        runSearch(search, term);
    });
    // This runs main program for the non-fs.read searches
} else {
    runSearch(search, term);
}

//this is the main program function that will take in the 2 arguments and select correct app to process the user's term
function runSearch(search, term) {
    // By default, if no search type is provided, search for a movie
    if (!search) {
        search = "movie-this";
    }

    // this runs the omdb.js if user selects "movie-this"
    if (search === "movie-this") {
        // By default, if no search term is provided, search for "Mr. Nobody"
        if (!term) {
            term = "Mr. Nobody";
        };
        //uses constructor from omdb.js to call the findMovie function and pass through the user's term
        movie.findMovie(term);
    // this runs the bands.js if user selects "concert-this"
    } else if (search === "concert-this") {
        //uses constructor from bands.js to call the findShow function and pass through the user's term
        band.findShow(term);
    // this runs the spotify.js if user selects "spotify-this-song"
    } else if (search === "spotify-this-song") {
        //By default, if no search term is provided, search for "The Sign"
        if (!term) {
            term = "The Sign";
        };
        //uses constructor from spotify.js to call the findSong function and pass through the user's term
        spotify.findSong(term);
    // if user types in an unknown search command
    } else {
        console.log("I don't know that.")
    }
}
