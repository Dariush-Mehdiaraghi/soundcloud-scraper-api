const express = require('express');
//const request = require('request');
const app = express();
const SoundCloud = require("soundcloud-scraper");
const client = new SoundCloud.Client();
const fs = require("fs")
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    console.log("request was made");

    client
        .getSongInfo(
            "https://soundcloud.com/shelter12kollektiv/dariush-mjs-kassette"
        )
        .then(async (song) => {
            const stream = await song.downloadProgressive();
            //    const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
            res.set('content-disposition', `attachment; filename="${song.title}.mp3"`);
            stream.pipe(res);

           
           // res.json(song);
        })
        .catch(console.error);



});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));


