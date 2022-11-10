const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const { getId, getSimilarArtists } = require('./spotify-search.js')
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

const Artist = mongoose.model('artist', { name: String, image: String, similarArtists: Array });

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors())

app.post(('/'), async (req, res) => {
  try {
    const artist = new Artist({ name: req.body.name, image: req.body.image, similarArtists: req.body.similarArtists });
    artist.save().then(() => console.log('Artist added to DB'));
    res.status(201).json('Item created')
  } catch {
    return res.status(500).send('APP ERROR')
  }
})

app.get(('/api/:artist'), async (req, res) => {
  try{
    const reqArtist = req.params.artist
    console.log(reqArtist)
    const artist = await Artist.findOne({ name: { $regex: new RegExp(reqArtist), $options: 'i' }});
    if (artist) {
      console.log('Artist restored from DB')
      return res.status(201).json({
        name : artist.name,
        image: artist.image,
        similarArtists: artist.similarArtists
    })
  }
    const spotifyArtistId = await getId(reqArtist);
    const newArtist = spotifyArtistId.artists.items[0]
    const similarArtists = await getSimilarArtists(newArtist.id)
    const addedArtistToDB = new Artist({ name: newArtist.name, image: newArtist.images[0].url, similarArtists: similarArtists });
    await addedArtistToDB.save().then(() => console.log('Artist added to DB'));
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