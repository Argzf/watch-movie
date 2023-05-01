<h1>watch-movie</h1>

<p align="center">
<a href="https://github.com/Argzf/watch-movie/blob/master/LICENSE.md"><img alt="GitHub license" src="https://img.shields.io/github/license/Argzf/watch-movie?style=flat-square"></a>
<a href="https://github.com/Argzf/watch-movie/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/Argzf/watch-movie?style=flat-square"></a>
<a href="https://github.com/Argzf/watch-movie/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/Argzf/watch-movie?style=flat-square"></a><br/>
<a href="https://discord.gg/Hj9ekSwqrA"><img src="https://discordapp.com/api/guilds/1005454357296332880/widget.png?style=banner2" alt="Discord Server"></a>
</p>

watch-movie is a web app for watching movies easily. Check it out at **[watch.gzf.cool](https://watch.gzf.cool)**.

This service works by displaying video files from third-party providers inside an intuitive and aesthetic user interface.

Features include:

- 🕑 Saving of your progress so you can come back to a video at any time!
- 🔖 Bookmarks to keep track of videos you would like to watch.
- 🎞️ Easy switching between seasons and episodes for a TV series; binge away!
- ✖️ Supports multiple types of content including movies, TV shows and Anime (coming soon™️)

## Goals of watch-movie

- No ads
- No BS: just a search bar and a video player
- No responsibility on the hoster, no databases or api's hosted by us, just a static site

## Self-hosting

A simple guide has been written to assist in hosting your own instance of movie-web.

Check it out here: [https://github.com/Argzf/watch-movie/blob/dev/SELFHOSTING.md](https://github.com/Argzf/watch-movie/blob/dev/SELFHOSTING.md)

## Running locally for development

To run this project locally for contributing or testing, run the following commands:
<h5><b>note: must use yarn to install packages and run NodeJS 16</b></h5>

```bash
git clone https://github.com/Argzf/watch-movie
cd movie-web
yarn install
yarn dev
```

To build production files, simply run `yarn build`.

You'll need to deploy a cloudflare service worker as well. Check the [selfhosting guide](https://github.com/movie-web/movie-web/blob/dev/SELFHOSTING.md) on how to run the service worker. Afterwards you can make a `.env` file and put in the URL. (see `example.env` for an example)

<h2>Contributing - <a href="https://github.com/Argzf/watch-movie/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/Argzf/watch-movie?style=flat-square"></a>
<a href="https://github.com/Argzf/watch-movie/pulls"><img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/Argzf/watch-movie?style=flat-square"></a></h2>

Check out [this project's issues](https://github.com/Argzf/watch-movie/issues) for inspiration for contribution. Pull requests are always welcome.

**All pull requests must be merged into the `dev` branch. it will then be deployed with the next version**

## Credits

This project would not be possible without our amazing contributors and the community.

<a href="https://github.com/Argzf/watch-movie/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Argzf/watch-movie?style=flat-square"></a>

<div style="display:flex;align-items:center;grid-gap:10px">
<img src="https://github.com/Argzf.png?size=20" width="20"><span><a href="https://github.com/Argzf">@gzf</a> project leader.</span>
</div>
