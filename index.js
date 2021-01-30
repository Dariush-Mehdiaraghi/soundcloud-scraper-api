const express = require('express');
//const request = require('request');
const app = express();
const fetch = require('node-fetch');
const SoundCloud = require("soundcloud-scraper");
const client = new SoundCloud.Client()
const PORT = process.env.PORT || 3000;
let APIkey

SoundCloud.keygen().then(key => {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
    console.log("🔑 key generated:", key);
    APIkey = key
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.delete('/', (req, res) => {
    console.log(req.method) // "DELETE"
})

//https://soundcloudstream.herokuapp.com/playlist?url=<soundcloudURL>
app.get('/playlist', (req, res) => {
    https://api-widget.soundcloud.com/resolve?url=https://soundcloud.com/shelter12kollektiv/sets/tracks&format=json&client_id=TaTmd2ARXgnp20a7BQJwuZ8xGFbrYgz5

    fetch(
        "https://api-widget.soundcloud.com/resolve?url=" + req.query.url + "&format=json&client_id=" + APIkey
    )
        .then((playlist) => {

            playlist.json()
                .then(parsedJSON => {
                    console.log("trackcount: ", parsedJSON.tracks.length);
                    res.json(parsedJSON)
                    console.log("🗒️ request for playlist:", req.query.url);
                })
                .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))




    // console.log("request for playlist: ", req.query.url, client.apiKey);
    // console.log("APIkey: ", APIkey);
    // client
    //     .getPlaylist(
    //         req.query.url
    //     )
    //     .then(async (playlist) => {
    //         res.json(playlist);
    //     })
    //     .catch(console.error);
})
//https://soundcloudstream.herokuapp.com/trackdl?url=<soundcloudURL>
app.get('/trackdl', (req, res) => {


    client
        .getSongInfo(
            req.query.url
        )
        .then(async (song) => {
            const stream = await song.downloadProgressive();
            console.log("⬇️ request for download of:", req.query.url);
            //    const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
            res.set('content-disposition', `attachment; filename="${song.title}.mp3"`);
            stream.pipe(res);
            // res.json(song);
        })
        .catch(console.error);
})
//https://soundcloudstream.herokuapp.com/user?name=<ScProfileName> zB. shetler12kollektiv
app.get('/user', (req, res) => {


    client
        .getUser(
            req.query.name
        ).then(async (playlist) => {
            console.log("👤 request for user of: ", req.query.name);
            res.json(playlist);
        })
        .catch(console.error);
})






