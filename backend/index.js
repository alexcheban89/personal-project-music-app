const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const { getId, getSimilarArtists, getDescription } = require('./spotify-search.js')
require('dotenv').config()

const uri =
  `mongodb+srv://alexander:${process.env.MONGO_DB_KEY}@cluster0.5xnbiiz.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

const Artist = mongoose.model('artist', { name: String, image: String, similarArtists: Array, description: String });

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors())

app.get(('/api/:artist'), async (req, res) => {
  try{
    const reqArtist = req.params.artist
    console.log(`FETCHING ARTIST FROM DB: ${reqArtist}`)
    const artist = await Artist.findOne({ name: { $regex: new RegExp(reqArtist), $options: 'i' }});
    if (artist) {
      return res.status(201).json(artist)
  }
    console.log('NO ENTRY FOUND IN DB')
    const spotifyArtistId = await getId(reqArtist);
    const newArtist = spotifyArtistId.artists.items[0]
    const similarArtists = await getSimilarArtists(newArtist.id)
    const descriptionArtist = await getDescription(newArtist.name)
    const addedArtistToDB = new Artist({ name: newArtist.name, image: newArtist.images[0].url, similarArtists: similarArtists, description: descriptionArtist });
    await addedArtistToDB.save()
    console.log(`ARTIST ADDED TO DB: ${newArtist.name}`)
    const artistFromDB = await Artist.find({ name: newArtist.name });
    const response = artistFromDB[0]
    return res.status(201).json(response)
} catch {
  return res.status(500).json('WOOPS')
}
})

app.listen(8000, () => {
  console.log("Server started on port 8000");
});