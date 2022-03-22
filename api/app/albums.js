const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const config = require('../config');
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const permit = require("../middleware/permit");
const identify = require("../middleware/identify");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const router = express.Router();
const upload = multer({ storage });

router.get('/', identify, async (req, res, next) => {
    try {
        let orQuery = [{isPublished: true}];
        if (req.user && req.user.role === 'admin') {
            orQuery.push({isPublished: false});
        } else if (req.user) {
            orQuery.push({user: req.user._id});
        }

        let filter = {};

        if (req.query.artist) {
            const artist = await Artist.findById(req.query.artist).and([{ $or: orQuery }]);
            if (!artist) {
                return res.send([]);
            }

            filter = { artist };
        }

        const albums = await Album.find(filter).and([{ $or: orQuery }])
        res.send(albums);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', identify, async (req, res, next) => {
    try {
        let query = [{isPublished: true}];
        if (req.user && req.user.role === 'admin') {
            query.push({isPublished: false});
        } else if (req.user) {
            query.push({user: req.user._id});
        }

        const album = await Album.findById(req.params.id).and([{ $or: query }]).populate('artist');
        if (!album) {
            return res.status(404).send({error: 'Not found'});
        }

        if (!album.artist.isPublished && (!req.user || (
            req.user.role !== 'admin' &&
            !album.artist.user.equals(req.user._id)
        ))) {
            return res.status(404).send({error: 'Not found'});
        }

        res.send(album);
    } catch (e) {
        next(e);
    }
});

router.get('/withArtist/:id', identify, async (req, res, next) => {
    try {
        let orQuery = [{isPublished: true}];
        if (req.user && req.user.role === 'admin') {
            orQuery.push({isPublished: false});
        } else if (req.user) {
            orQuery.push({user: req.user._id});
        }

        const artist = await Artist.findById(req.params.id).and([{ $or: orQuery }]);
        if (!artist) {
            return res.status(404).send({error: 'Not found'});
        }

        const albums = await Album.find({ artist }).and([{ $or: orQuery }]);

        res.send({ artist, albums });
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        const albumData = {
            user: req.user._id,
            name: req.body.name,
            artist: req.body.artist,
            year: req.body.year
        };

        if (req.file) {
            albumData.image = req.file.filename;
        }

        if (req.user.role === 'admin') {
            albumData.isPublished = true;
        }

        const album = new Album(albumData);
        await album.save();

        res.send(album);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).send({error: 'Page not found'});
        }

        album.isPublished = true;
        await album.save();

        return res.send(album);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).send({error: 'Page not found'});
        }

        await album.remove();
        return res.send({message: 'OK'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;