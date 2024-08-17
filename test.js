// prompts Spotify API to get a token

const { get } = require('http');

// returns: token
function getSpotifyToken() {
  // configure environment variables and request module
  require('dotenv').config();
  const request = require('request');

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
      return token;
    }
    else {
      console.log("Error: " + response.statusCode);
    }
  });
}


function getArtist(token, artists) {
  var options = {
    url: `https://api.spotify.com/v1/artists/ ${artists}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Response:', body);
    }
  });
}


// token = getSpotifyToken();
token = "BQAHX12FMIxu6CNeRWdpckkeUO79eLqQ80GB4yBlPjPN4dK26SXjd_M_x0YwO4kqII7fCxdB3M2TVto6qKxpn7DL7LI7tE6h6OnJKxiqHEvuzX50egc"
getArtist(token, "4V8LLVI7PbaPR0K2TGSxFF?si=SjK33By4SkqoJXbgdbb9_A");