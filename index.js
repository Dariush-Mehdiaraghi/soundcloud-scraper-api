const express = require('express');
//const request = require('request');
const app = express();
const SoundCloud = require("soundcloud-scraper");
const client = new SoundCloud.Client();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.delete('/', (req, res) => {
    console.log(req.method) // "DELETE"
})

//https://soundcloudstream.herokuapp.com/playlist?url=<soundcloudURL>
app.get('/playlist', (req, res) => {
    console.log("request for playlist: ", req.query.url);
    client
        .getPlaylist(
            req.query.url
        )
        .then(async (playlist) => {
            res.json(playlist);
        })
        .catch(console.error);
})
//https://soundcloudstream.herokuapp.com/trackdl?url=<soundcloudURL>
app.get('/trackdl', (req, res) => {
    console.log("request for download of: ", req.query.url);

    client
        .getSongInfo(
            req.query.url
        )
        .then(async (song) => {
            const stream = await song.downloadProgressive();
            //    const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
            res.set('content-disposition', `attachment; filename="${song.title}.mp3"`);
            stream.pipe(res);
            // res.json(song);
        })
        .catch(console.error);
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));


