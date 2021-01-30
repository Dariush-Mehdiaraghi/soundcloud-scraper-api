
# soundcloud-scraper API 

A small replacement for the missing SoundCloud API. Gives you access to infos of playlists, users, songs and lets your download songs as mp3. No API key or user ID is needed. 
Made with [express](https://github.com/expressjs/express) and [soundcloud-scraper](https://github.com/DevSnowflake/soundcloud-scraper). 
It lets you get all the songs in a playlist instead the first 5 songs by scraping the missing songs form the SoundCloud Widget API with [jsdom](https://github.com/jsdom/jsdom).

## Installation
Clone this repo to your nodeserver 
`git clone https://github.com/Dariush-Mehdiaraghi/soundcloud-scraper-api`
and run `npm install && npm start`. 

Or depoly directly on Heroku: 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Usage

Getting a playlist

```
fetch("https://yourdomain.com/playlist?url=<SoundCloudURL>")
    .then((response) => response.json())
    .then((playlistObject) => {
        console.log(playlistObject)
      })
      .catch(console.error)
```

Getting infos of a user (username not url!)
```
fetch("https://yourdomain.com/user?name=<username>")
    .then((response) => response.json())
    .then((user) => {
        console.log(user)
      })
      .catch(console.error)
```
Getting infos of a song
```
fetch("https://yourdomain.com/song?url=<SoundCloudURL>")
    .then((response) => response.json())
    .then((song) => {
        console.log(song)
      })
      .catch(console.error)
```
Streaming a song in your frontend application
```
let audio = new Audio("https://yourdomain.com/songdl?url=<SoundCloudURL>")
audio.play()
```