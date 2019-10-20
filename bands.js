//importing necessary files
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

// Create the Band constructor
var Bands = function () {
    // divider will be used as a spacer between the tv data we print in log.txt
    var divider = "\n------------------------------------------------------------\n\n";

    // findShow takes in the name of a musician and searches the Bands in Town API
    this.findShow = function (artist) {
        //query URL to pass into the bandsintown API
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        //uses the npm axios to access the api
        axios.get(queryUrl).then(function (response) {
            // Place the response.data into a variable, jsonData.
            var jsonData = response.data;
            // Create an empty concert data array
            concertDataArr = [];
            // Loop that iterates through the results to add each occurence of a band playing a concert to the concertDataArr
            for (let index = 0; index < jsonData.length; index++) {
                var venueName = "Venue Name: " + jsonData[index].venue.name;
                var venueLocation = "Venue Location: " + jsonData[index].venue.city + " , " + jsonData[index].venue.region;
                var date = "Venue Date: " + moment(jsonData[index].datetime).format("MM/DD/YY");
                //adds a divider b/w events for the console log
                var divider2 = "----------------------------------------";
                //adds individual concert info to the concertDataArr
                concertDataArr.push(venueName, venueLocation, date, divider2);
            }

              // Append concertDataArr and the divider to log.txt, print concertDataArr to the console
            fs.appendFile("log.txt", "Concert Data for: " + artist + divider + concertDataArr.join("\n") + divider, function (err) {
                if (err) throw err;
                console.log(concertDataArr);
            });
        });
    };
}

//allows the Bands constructor to be exported globally to be used in liri.js
module.exports = Bands;

