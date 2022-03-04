const express = require('express');
const mongoose = require('mongoose');

const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const albumId = req.query.album;
        const artistId = req.query.artist;
        if (albumId && artistId) {
            return res.status(400).send({message: 'Can\'t put album id and artist id in the same request'});
        }

        let findParams = {};
        if (albumId) {
            findParams.album = albumId;
        }

        if (artistId) {
            findParams.album = await Album.find({ artist: artistId }, { _id: 1 });
        }

        const tracks = await Track.find(findParams);
        res.send(tracks);
    } catch (e) {
        next(e);
    }
});

router.get('/byAlbum/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const album = await Album.findById(id);
        if (!album) {
            return res.status(400).send({message: 'Page not found!'});
        }

        const artist = await Artist.findById(album.artist);
        const tracks = await Track.find({ album: album._id });

        res.send({ artist, album, tracks });
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const name = req.body.name;
        const album = req.body.album;
        const duration = req.body.duration;

        const track = new Track({ name, album, duration });
        await track.save();

        res.send(track);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);
    }
});

module.exports = router;