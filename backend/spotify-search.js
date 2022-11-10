const fetch = require('node-fetch')
const formatter = require('./wikip-formatter');

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
    const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
    headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.SPOTIFY_KEY}`,
    }})
    const data = await res.json()
    return data.artists
}

const getDescription = async (artistName) => {
  const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=${formatter.wikiTitle(artistName)}`)
  const data = await res.json()
  const formatterParse = formatter.parse(data)
  const regex = /(<([^>]+)>)/ig
  const description = formatterParse.split('</p><p>')[0].replaceAll(regex, "");
  return description;
}

module.exports.getId = getId;
module.exports.getSimilarArtists = getSimilarArtists;
module.exports.getDescription = getDescription;