require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var axios = require('axios');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var choice = [];


for (let i = 3; i < process.argv.length; i++) {
    choice.push(process.argv[i]);
}
choice = choice.join('');
console.log(command);
console.log(choice);
switch(command) {
    case 'movie-this':
        if (choice===[]){
            movie("mr.nobody")
        } else {
            movie(choice)
        } 
    break;
    case 'concert-this':
            bands(choice); 
    break;
        }
    



 
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
//     console.log(data); 
// });

//Axios Call for Bands in Town for argv3
function bands(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") // push user choice into array then search Bands in Town API for choice 
    .then(function (response){
        var data = response.data
        for (let i = 0; i < data.length; i++) {
            object = data[i];
        }
        console.log(object.venue.name)
        console.log(object.venue.city + ", " + object.venue.region + object.venue.country)
        var time = object.datetime
        var newTime = moment(time).format("MM/DD/YYYY")
        console.log(newTime)
        // console.log(object.datetime.toString("yyyyMMddHHmmss"))
    })
}
 // Name of the venue
        // Venue location
        // Date of the Event(use moment to format this as "MM/DD/YYYY")

// Axios Call for OMDB Database for argv3 
function movie(choice) {
axios.get("http://www.omdbapi.com/?t=" + choice + '&y=&plot=short&apikey=trilogy') //push user choice into array then search omdb for this choice
    .then(function (response) {
        var data = response.data
        console.log("Title: " + data.Title)
        console.log("Released in:  " + data.Released)
        for (let i = 0; i < data.Ratings.length; i++) {
            Ratings = data.Ratings[i];
            if (Ratings.Source === 'Rotten Tomatoes') {
                console.log("Rotten Tomatoes Rating: " + JSON.stringify(Ratings.Value))
            }
        }
        console.log("ImdbRating: " + data.imdbRating)
        console.log("Origin:  " + data.Country)
        console.log("Language: " + data.Language)
        console.log("Plot: " + data.Plot)
        console.log("Actors: " + data.Actors)
    })}
    