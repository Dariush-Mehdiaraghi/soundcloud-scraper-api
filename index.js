const express = require('express');
//const request = require('request');
const app = express();
const SoundCloud = require("soundcloud-scraper");
const client = new SoundCloud.Client();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  console.log("request was made");

  client
    .getSongInfo(
      "https://soundcloud.com/shelter12kollektiv/sheltercast-no6-schematica"
    )
    .then(async (song) => {
      res.json(song);
    })
    .catch(console.error);



});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));


