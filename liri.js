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
    case 'spotify-this-song':
        // if (choice === []) {
        //     spotify.search({ type: 'track', query: 'The Sign' }, function (err, data) {
        //         if (err) {
        //             return console.log('Error occurred: ' + err);
        //         }
        //         console.log(data.tracks.items[0]);
        //     });
        // } else {
            spotify.search({ type: 'track', query: choice }, function (err, data) {
                console.log("Artist Name: " + data.tracks.items[1].album.artists[0].name);
                console.log("Album Name: " + data.tracks.items[1].album.name);
               
            });
        } 
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

//Axios Call for Bands in Town based on user choice entry
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
        var newTime = moment(time).format("MM/DD/YYYY") // reformats the object.datetime to MM DD YYYY
        console.log(newTime)
        // console.log(object.datetime.toString("yyyyMMddHHmmss"))
    })
}

// Axios Call for OMDB Database based on user choice entry 
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


    