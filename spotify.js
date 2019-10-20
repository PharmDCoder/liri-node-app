//importing necessary files
var SpotifyReq = require('node-spotify-api');
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");

//importing api keys 
var spotifyKeys = new SpotifyReq(keys.spotify);

// Create the Spotify constructor
var Spotify = function () {
    // divider will be used as a spacer between the tv data we print in log.txt
    var divider = "\n------------------------------------------------------------\n\n";

    // findSong takes in the name of a song and searches the spotify database
    this.findSong = function (track) {
        //uses the imported spotify keys to conduct a query function w/ a track title
        spotifyKeys.search({ type: "track", query: track }, function (err, data) {
            //will alert user if error occurs
            if (err) {
                console.log("Error has occured" + err);
            }
            // Place the response.data into a variable, jsonData.
            var jsonData = data.tracks.items;
            // create an empty array for song data
            var songDataArr = [];
            // loop to add each song data to the songData array from the query results
            for (let index = 0; index < jsonData.length; index++) {
                var songName = "Song Name: " + (jsonData[index].name);
                var artistName = "Artist Name: " + (jsonData[index].artists[0].name);
                var sampleLink = "Sample Link: " + (jsonData[index].external_urls.spotify);
                var albumName = "Album Name: " + (jsonData[index].album.name);
                //adding divider to separate each song's results in the songDataArr
                var divider2 = "----------------------------------------";
                //this pushes the individual song data into an array
                songDataArr.push(artistName, songName, sampleLink, albumName, divider2);
            }

            // Append showSong and the divider to log.txt, print showSong to the console
            fs.appendFile("log.txt", songDataArr.join("\n") + divider, function (err) {
                if (err) throw err;
                console.log(songDataArr);
            });
        });
    };
}

//allows the spotify constructor to be exported and used in liri.js
module.exports = Spotify;