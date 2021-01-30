const express = require('express')
const app = express()
const fetch = require('node-fetch')
const SoundCloud = require('soundcloud-scraper')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const client = new SoundCloud.Client()
const PORT = process.env.PORT || 3000
let APIkey

SoundCloud.keygen().then(key => {
    app.listen(PORT, () => console.log(`👂 listening on ${PORT}`))
    console.log("🔑 key generated:", key)
    APIkey = key
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
app.delete('/', (req, res) => {
    console.log(req.method)
})

// Response: playlist object (e.g. for request: https://yourdomain.com/playlist?url=https://soundcloud.com/shelter12kollektiv/sets/sheltercast)
app.get('/playlist', (req, res) => {
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
                console.log("🗒️ request for playlist:", req.query.url)
                res.json(parsedJSON)
            })

        })
        .catch(console.error)
})

// Response: user info (e.g. for request: https://yourdomain.com/user?name=shetler12kollektiv)  <-- Username NOT URL!
app.get('/user', (req, res) => {
    client
        .getUser(
            req.query.name
        ).then(async (playlist) => {
            console.log("👤 request for user:", req.query.name)
            res.json(playlist)
        })
        .catch(console.error)
})

// Response: song info (e.g. for request: https://yourdomain.com/song?url=https://soundcloud.com/shelter12kollektiv/dariush-mjs-kassette)
app.get('/song', (req, res) => {
    getJsonFromWidgetAPI(
        req.query.url
    ).then(async (song) => {
        console.log("🎶 request for song:", req.query.url)
        res.json(song)
    })
        .catch(console.error)
})

// Response: mp3 file (e.g. for request: /https://yourdomain.com/trackdl?url=https://soundcloud.com/shelter12kollektiv/dariush-mjs-kassette) 
app.get('/songdl', (req, res) => {
    client
        .getSongInfo(
            req.query.url
        )
        .then(async (song) => {
            const stream = await song.downloadProgressive()
            console.log("⬇️ request for download of:", req.query.url)
            res.set('content-disposition', `attachment filename="${song.title}.mp3"`)
            stream.pipe(res)
        })
        .catch(console.error)
})

/**
     * Returns song object by passing the ID of a song
     * @param {number} songID ID of a song (e.g: 835788787)
     * @returns {object} song object
     */
async function getMissingTrack(songID) {
    try {
        const raw = await fetch("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + songID)
        const response = await raw.text()
        const dom = new JSDOM(response)
        const foundURL = dom.window.document.querySelector("link:nth-child(15)").href
        console.log("🔗 scraped link:", foundURL)
        const song = await getJsonFromWidgetAPI(foundURL)
        return song
    } catch (e) {
        console.error(e)
    }
}

/**
     * Returns object from the soundcloud WidgetAPI (e.g. passing the URL of a playlist, retuns a playlist object)
     * @param {string} url full SoundCloud URL (e.g. https://soundcloud.com/shelter12kollektiv/dariush-mjs-kassette)
     * @returns {object} object from soundcloud
     */
async function getJsonFromWidgetAPI(url) {
    try {
        const response = await fetch(
            "https://api-widget.soundcloud.com/resolve?url=" + url + "&format=json&client_id=" + APIkey
        )
        const data = await response.json()
        return data
    }
    catch (e) {
        console.error(e)
    }
}