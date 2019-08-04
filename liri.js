require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var axios = require('axios');
var moment = require('moment');
const fs = require('fs')
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var choice = [];


for (let i = 3; i < process.argv.length; i++) {
    choice.push(process.argv[i]);
}
choice = choice.join('');
function look(command, choice){
switch(command) {
    case 'movie-this':
        if (choice===''){
            movie("mr.nobody")
        } else {
            movie(choice)
        } 
    break;
    case 'concert-this':
            bands(choice); 
    break;
    case 'spotify-this-song':
    
        spotify.search({ type: 'track', query: choice }, function (err, data) {
            if (data=== null) {
                spotify.search({ type: 'track', query: 'The Sign' }, function (err, data) {
                    console.log("Artist Name: " + data.tracks.items[1].album.artists[0].name);
                    console.log("Song Name: " + data.tracks.items[1].name);
                    console.log("Preview URL: " + data.tracks.items[1].preview_url);
                    console.log("Album Name: " + data.tracks.items[1].album.name);
                    return;
                })} else {
                  console.log("Artist Name: " + data.tracks.items[1].album.artists[0].name);
                 console.log("Song Name: " + data.tracks.items[1].name);
                console.log("Preview URL: " + data.tracks.items[1].preview_url);
                console.log("Album Name: " + data.tracks.items[1].album.name);
                }})
          
    break;
    case 'do-what-it-says':
        fs.readFile("random.txt", "utf8", function (err, response) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }
            // Otherwise
            
            var response = response.split(',');
            var command = response[0];
            var choice = response[1];
            look(command, choice);

            

        });

    break;
        }
    }
    look(command, choice);


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
