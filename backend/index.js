const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser')
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

app.post(('/'), async (req, res) => {
    const artist = new Artist({ name: req.body.name, image: req.body.image, similarArtists: req.body.similarArtists });
    artist.save().then(() => console.log('Artist added to DB'));
    res.status(201).json('Item created')
})

app.get(('/'), async (req, res) => {
    const artist = await Artist.find({ name: req.body.name });
    res.status(201).json(artist)
})

app.listen(8000, () => {
  console.log("Server started on port 8000");
});