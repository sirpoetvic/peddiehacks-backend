// prompts Spotify API to get a token

const { get } = require('http');

// configure environment variables and request module
require('dotenv').config();
const request = require('request');

// returns: token
function getSpotifyToken() {

  // set up variables for Spotify API
  var client_id = process.env.SPOTIFY_ID;
  var client_secret = process.env.SPOTIFY_SECRET;

  // set up options for Spotify API
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  // if the request is successful, return the token
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
      console.log(token);
      return token;
    }
    else {
      console.log("Error: " + response.statusCode);
    }
  });
}


function getArtist(token, artists) {
  // set up the headers and url for the API
  var options = {
    url: `https://api.spotify.com/v1/artists/${artists}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  // make the request to the API and parse the data, returning artist name
  request(options, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Status:', response.statusCode);
      data = JSON.parse(body);
      console.log('Artist Name:', data.name);
    }
  });
}

// token = getSpotifyToken();
token = "BQCrNnD8Q6sWClAZAjGcnFGOL3YHiuE0np4ajHCuf6TcIxC-E_kS7cnxSJGPOmXs_J6kYl0yN1NZT-FoMTwH5AQ27VjYs9CiehGMQ7yciwNSRhzbVKQ"
artistid = "4Z8W4fKeB5YxbusRsdQVPb";
getArtist(token, artistid);