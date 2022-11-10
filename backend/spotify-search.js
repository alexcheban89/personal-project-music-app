const fetch = require('node-fetch')

const getId = async (artist) => await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
    headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.SPOTIFY_KEY}`,
    }
})
.then(res => res.json())

const getSimilarArtists = async (artistId) => {
    console.log('FETCHING FROM SPOTIFY')
    return await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
    headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.SPOTIFY_KEY}`,
    }
})
  .then(res => res.json())
  .then (data => data.artists)
}

module.exports.getId = getId;
module.exports.getSimilarArtists = getSimilarArtists;