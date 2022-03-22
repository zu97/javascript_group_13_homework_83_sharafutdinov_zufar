const express = require('express');
const mongoose = require('mongoose');

const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Track = require('../models/Track');
const auth = require("../middleware/auth");
const identify = require("../middleware/identify");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/', identify, async (req, res, next) => {
    try {
        const albumId = req.query.album;
        const artistId = req.query.artist;
        if (albumId && artistId) {
            return res.status(400).send({error: 'Can\'t put album id and artist id in the same request'});
        }

        let orQuery = [{isPublished: true}];
        if (req.user && req.user.role === 'admin') {
            orQuery.push({isPublished: false});
        } else if (req.user) {
            orQuery.push({user: req.user._id});
        }

        let findParams = {};
        if (albumId) {
            const album = await Album.findById(albumId).and([{ $or: orQuery }]);
            if (!album) {
                return res.send([]);
            }

            findParams.album = album;
        }

        if (artistId) {
            const artist = await Artist.findById(artistId).and([{ $or: orQuery }]);
            if (!artist) {
                return res.send([]);
            }

            findParams.album = await Album.find({ artist }, { _id: 1 }).and([{ $or: orQuery}]);
        }

        const tracks = await Track.find(findParams).and([{ $or: orQuery }]);
        res.send(tracks);
    } catch (e) {
        next(e);
    }
});

router.get('/byAlbum/:id', identify, async (req, res, next) => {
    try {
        let orQuery = [{isPublished: true}];
        if (req.user && req.user.role === 'admin') {
            orQuery.push({isPublished: false});
        } else if (req.user) {
            orQuery.push({user: req.user._id});
        }

        const album = await Album.findById(req.params.id).and([{ $or: orQuery }]);
        if (!album) {
            return res.status(404).send({error: 'Page not found!'});
        }

        const artist = await Artist.findById(album.artist).and([{ $or: orQuery }]);
        if (!artist) {
            return res.status(404).send({error: 'Page not found!2'});
        }

        const tracks = await Track.find({ album: album._id }).and([{ $or: orQuery }]);

        res.send({ artist, album, tracks });
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, async (req, res, next) => {
    try {
        const trackData = {
            user: req.user._id,
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
            youtube: req.body.youtube,
        };

        if (req.user.role === 'admin') {
            trackData.isPublished = true;
        }

        const track = new Track(trackData);
        await track.save();

        res.send(track);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res, next) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).send({error: 'Page not found'});
        }

        track.isPublished = true;
        await track.save();

        return res.send(track);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).send({error: 'Page not found'});
        }

        await track.remove();
        return res.send({message: 'OK'});
    } catch (e) {
        next(e);
    }
});


module.exports = router;