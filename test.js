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


function getArtist(token, artist_id) {
  // set up the headers and url for the API
  var options = {
    url: `https://api.spotify.com/v1/artists/${artist_id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  // make the request to the API and parse the data, returning artist name
  request(options, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
    } else {
      // console.log('Status:', response.statusCode);
      data = JSON.parse(body);
      console.log('Artist Name:', data.name);
    }
  });
}

function getTrack(token, track_id) {
  // set up the headers and url for the API
  var options = {
    url: `https://api.spotify.com/v1/tracks/${track_id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  // make the request to the API and parse the data, returning track name
  request(options, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
    } else {
      // console.log('Status:', response.statusCode);
      data = JSON.parse(body);
      console.log('Track Name:', data.name);
    }
  });
}

function getGenres(token) {
  // set up the headers and url for the API
  var options = {
    url: `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  // make the request to the API and parse the data, returning track name
  request(options, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
    } else {
      // console.log('Status:', response.statusCode);
      data = JSON.parse(body);
      console.log('Artist Name:', data.genres);
    }
  });
}

function seedStrength(seed) {
  list = [];
  for (var i = 0; i < seed.length; i++) {
    // if the seed genre rating is in a range, add more of it to the list
    // if the seed genre is from 1-4, leave it as is
    if(seed[i][1] <= 4) {
      genre_list.push(seed[i][0]);
    }
    // if the seed genre is 5-7, add it twice
    else if(seed[i][1] <= 7) {
      genre_list.push(seed[i][0]);
      genre_list.push(seed[i][0]);
    }
    // if the seed genre is 8-10, add it three times
    else {
      genre_list.push(seed[i][0]);
      genre_list.push(seed[i][0]);
      genre_list.push(seed[i][0]);
    }
  }
  return list;
}

function getRecommendations(token, seedGenres, seedArtists, seedTracks) {
  const allSeeds = [...seedGenres, ...seedArtists, ...seedTracks];

  // Ensure we have at least one seed
  if (uniqueSeeds.length === 0) {
    console.error('No seeds provided');
    return;
  }

  // If we have fewer than 5 seeds, repeat some to reach 5
  while (uniqueSeeds.length < 5) {
    uniqueSeeds.push(...uniqueSeeds);
    uniqueSeeds.length = 5; // Ensure we don't exceed 5
  }

  const seedGenresStr = uniqueSeeds.filter(seed => seedGenres.includes(seed)).join(',');
  const seedArtistsStr = uniqueSeeds.filter(seed => seedArtists.includes(seed)).join(',');
  const seedTracksStr = uniqueSeeds.filter(seed => seedTracks.includes(seed)).join(',');

  const options = {
    url: `https://api.spotify.com/v1/recommendations?seed_genres=${seedGenresStr}&seed_artists=${seedArtistsStr}&seed_tracks=${seedTracksStr}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
    } else {
      const data = JSON.parse(body);
      console.log('Recommendations:', data);
    }
  });
}

function getRecommendationsAPI(token, seed_genres, seed_artists, seed_tracks) {

  // set up the headers and url for the API
  var options = {
    url: `https://api.spotify.com/v1/recommendations?seed_genres=${seed_genres}&seed_artists=${seed_artists}&seed_tracks=${seed_tracks}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  // make the request to the API and parse the data, returning track name
  request(options, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
    } else {
      // console.log('Status:', response.statusCode);
      data = JSON.parse(body);
      console.log('Recommendations:', data.tracks);
    }
  });
}



// token = getSpotifyToken();
token = "BQBJBmHR2It8OekIfjaODZlFSGbFJt5jrYaJxQImCR6GtOHEPMPn8MRw6Z-cDiDMfy8YlJPWAJ0UmR4d5zaBulkyYwJ2sCpIQ2uToxFFCxEMb4aqgb8";

// ask for user to seeds and weights
getRecommendations(token, ['pop', 'rock'], ['0OdUWJ0sBjDrqHygGUXeCF'], ['0eGsygTp906u18L0Oimnem']);