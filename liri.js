require("dotenv").config()
var keys = require("keys.js")
var spotify = new Spotify(keys.spotify)
var axios = require("axios")


var search = process.argv[2]
var term = process.argv.slice(3).join(" ")

if (search === "concert-this") {
    console.log("searching for concert")
    findConcert(term)
} else if (search === "spotify-this-song") {
    console.log("searching for song")
    findSong(term)
} else if (search === "movie-this") {
    console.log("searching for movie")
    findMovie(term)
}

function findConcert() {
    
    var artist = term
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(URL).then(function(response) {
        var jsonData = response.data
        var concertData = [
            "Venue: " + jsonData.venue.name,
            "Venue Location: " + jsonData.venue.city,
            "Event Date: " + jsonData.datetime
        ].join("\n\n")
        console.log(concertData)
    })
}

function findSong() {
    
    var spotify = new Spotify(keys.spotify)

    spotify
        .search({ type: 'track', query: term})
        .then(function(response) {
            var jsonData = response.data
            console.log("Artist: " + jsonData.artists[0].name + "\nSong Name: "
            + jsonData.name + "\nAlbum Name: " + jsonData.album.name)
        })
} 

function findMovie() {

    var movie = term
    var URL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"

    axios.get(URL).then(function(response) {
        var jsonData = response.data
        var movieData = [
            "Movie: " + jsonData.title,
            "Released: " + jsonData.released,
            "IMDB Rating: " + jsonData.ratings[1].value,
            "Rotten Tomatoes Rating: " + jsonData.ratings[0].value,
            "Country: " + jsonData.country,
            "Language: " + jsonData.language,
            "Plot: " + jsonData.plot,
            "Actors: " + jsonData.actors
        ].join("\n\n")
        console.log(movieData)
    })
}