
# soundcloud-scraper API ☁️

A small replacement for the missing SoundCloud API. Gives you access to infos of playlists, users, songs and lets you download songs as mp3. No API key or user ID is needed. 
Made with [express](https://github.com/expressjs/express) and [soundcloud-scraper](https://github.com/DevSnowflake/soundcloud-scraper). 
It lets you get all the songs in a playlist instead of the first 5 songs by scraping the missing songs from the SoundCloud Widget API with [jsdom](https://github.com/jsdom/jsdom).

## Installation
Clone this repo to your nodeserver 
`git clone https://github.com/Dariush-Mehdiaraghi/soundcloud-scraper-api`
and run `npm install && npm start`. 

Or simply deploy directly to Heroku: 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Dariush-Mehdiaraghi/soundcloud-scraper-api)

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
<details><summary>Response</summary>
<p>

```json
{
  "artwork_url": null,
  "created_at": "2020-08-10T14:14:25Z",
  "description": null,
  "duration": 20963526,
  "embeddable_by": "all",
  "genre": "",
  "id": 1108273210,
  "kind": "playlist",
  "label_name": null,
  "last_modified": "2020-09-15T22:20:30Z",
  "license": "all-rights-reserved",
  "likes_count": 2,
  "managed_by_feeds": false,
  "permalink": "sheltercast",
  "permalink_url": "https://soundcloud.com/shelter12kollektiv/sets/sheltercast",
  "public": true,
  "purchase_title": null,
  "purchase_url": null,
  "release_date": null,
  "reposts_count": 0,
  "secret_token": null,
  "sharing": "public",
  "tag_list": "",
  "title": "Sheltercast",
  "uri": "https://api.soundcloud.com/playlists/1108273210",
  "user_id": 226055700,
  "set_type": "",
  "is_album": false,
  "published_at": "2020-08-10T14:14:25Z",
  "display_date": "2020-08-10T14:14:25Z",
  "user": {...},
   "tracks": [...],
   "track_count": 6
}
```

</p>
</details>

Getting a user (username not url!)
```
fetch("https://yourdomain.com/user?name=<username>")
    .then((response) => response.json())
    .then((user) => {
        console.log(user)
      })
      .catch(console.error)
```
<details><summary>Response</summary>
<p>

```json
{
  "urn": 226055700,
  "username": "shelter12kollektiv",
  "name": "Shelter12Kollektiv",
  "verified": false,
  "createdAt": "2016-05-11T11:14:15.000Z",
  "avatarURL": "https://i1.sndcdn.com/avatars-EyHOw3WfdW7EmfD6-2fp6fw-large.jpg",
  "profile": "https://soundcloud.com/shelter12kollektiv",
  "bannerURL": "https://i1.sndcdn.com/visuals-000226055700-shxInE-original.jpg",
  "followers": 83,
  "following": 69,
  "likesCount": 163,
  "tracksCount": 7,
  "tracks": [...(only 2 tracks)],
  "likes": []
}
```
</p>
</details>
Getting a song

```
fetch("https://yourdomain.com/song?url=<SoundCloudURL>")
    .then((response) => response.json())
    .then((song) => {
        console.log(song)
      })
      .catch(console.error)
```
<details><summary>Response</summary>
<p>

```json
{
  "artwork_url": "https://i1.sndcdn.com/artworks-WgBRMDHNX5w0uwKz-ca8zKQ-large.jpg",
  "caption": null,
  "commentable": true,
  "comment_count": 5,
  "created_at": "2020-06-07T15:35:31Z",
  "description": "Moonwalks vor der Jukebox\nMusic Video: https://www.youtube.com/watch?v=-euvnSN5s3A\nhttps://soundcloud.com/dariush-mehdiaraghi",
  "downloadable": false,
  "download_count": 0,
  "duration": 192026,
  "full_duration": 192026,
  "embeddable_by": "all",
  "genre": "",
  "has_downloads_left": true,
  "id": 835788787,
  "kind": "track",
  "label_name": null,
  "last_modified": "2020-07-16T10:42:20Z",
  "license": "all-rights-reserved",
  "likes_count": 58,
  "permalink": "dariush-mjs-kassette",
  "permalink_url": "https://soundcloud.com/shelter12kollektiv/dariush-mjs-kassette",
  "playback_count": 1301,
  "public": true,
  "publisher_metadata": {
    "id": 835788787,
    "urn": "soundcloud:tracks:835788787",
    "contains_music": true
  },
  "purchase_title": null,
  "purchase_url": null,
  "release_date": null,
  "reposts_count": 7,
  "secret_token": null,
  "sharing": "public",
  "state": "finished",
  "streamable": true,
  "tag_list": "",
  "title": "dariush - mj's kassette",
  "track_format": "single-track",
  "uri": "https://api.soundcloud.com/tracks/835788787",
  "urn": "soundcloud:tracks:835788787",
  "user_id": 226055700,
  "visuals": null,
  "waveform_url": "https://wave.sndcdn.com/i0YeGan8XhUv_m.json",
  "display_date": "2020-06-07T15:35:31Z",
  "media": {
    "transcodings": [
      {
        "url": "https://api-widget.soundcloud.com/media/soundcloud:tracks:835788787/5cfce061-e7e8-463b-8866-f4173e992d45/stream/hls",
        "preset": "mp3_0_1",
        "duration": 192026,
        "snipped": false,
        "format": {
          "protocol": "hls",
          "mime_type": "audio/mpeg"
        },
        "quality": "sq"
      },
      {
        "url": "https://api-widget.soundcloud.com/media/soundcloud:tracks:835788787/5cfce061-e7e8-463b-8866-f4173e992d45/stream/progressive",
        "preset": "mp3_0_1",
        "duration": 192026,
        "snipped": false,
        "format": {
          "protocol": "progressive",
          "mime_type": "audio/mpeg"
        },
        "quality": "sq"
      },
      {
        "url": "https://api-widget.soundcloud.com/media/soundcloud:tracks:835788787/48995926-9eb3-442d-a141-da2ddc9937b3/stream/hls",
        "preset": "opus_0_0",
        "duration": 191997,
        "snipped": false,
        "format": {
          "protocol": "hls",
          "mime_type": "audio/ogg; codecs=\"opus\""
        },
        "quality": "sq"
      }
    ]
  },
  "monetization_model": "NOT_APPLICABLE",
  "policy": "ALLOW",
  "user": {...}
  }
}
```
</p>
</details>

Streaming/downloading a song in your front-end application
```
let audio = new Audio("https://yourdomain.com/songdl?url=<SoundCloudURL>")
audio.play()
```

