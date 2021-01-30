const express = require('express');
//const request = require('request');
const app = express();
const fetch = require('node-fetch');
const SoundCloud = require("soundcloud-scraper");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
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
    //https://api-widget.soundcloud.com/resolve?url=https://soundcloud.com/shelter12kollektiv/sets/tracks&format=json&client_id=TaTmd2ARXgnp20a7BQJwuZ8xGFbrYgz5

    getJsonFromWidgetAPI(req.query.url)
        .then(parsedJSON => {
            let foundTracksPromises = parsedJSON.tracks.map(track => {

                if (!track.title) {
                    return getMissingTrack(track.id).then(foundTrack => {
                        return foundTrack
                    })
                }
                else {
                    return track
                }
            })
            Promise.all(foundTracksPromises).then((foundTracks) => {
                parsedJSON.tracks = foundTracks
                res.json(parsedJSON)
                console.log("🗒️ request for playlist:", req.query.url);
            })

        })
        .catch((err) => console.log(err))
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

async function getMissingTrack(trackID) {
    const raw = await fetch("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + trackID)

    const response = await raw.text()

    const dom = new JSDOM(response);
    const foundURL = dom.window.document.querySelector("link:nth-child(15)").href
    console.log("🔗 scraped link:", foundURL);

    const song = await getJsonFromWidgetAPI(foundURL)

    return song
}




//https://api-widget.soundcloud.com/resolve?url=https://soundcloud.com/shelter12kollektiv/dariush-mjs-kassette&format=json&client_id=TaTmd2ARXgnp20a7BQJwuZ8xGFbrYgz5
async function getJsonFromWidgetAPI(urlToSearch) {
    const response = await fetch(
        "https://api-widget.soundcloud.com/resolve?url=" + urlToSearch + "&format=json&client_id=" + APIkey
    )
   
    const data = await response.json()

    return data
}