const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const config = require('../config');
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

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

router.get('/', async (req, res, next) => {
    try {
        const artist = req.query.artist;
        let filter = null;

        if (artist) {
            filter = { artist };
        }

        const albums = await Album.find(filter);
        res.send(albums);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist');
        if (!album) {
            return res.status(404).send({message: 'Not found'});
        }

        res.send(album);
    } catch (e) {
        next(e);
    }
});

router.get('/withArtist/:id', async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).send({message: 'Not found'});
        }

        const albums = await Album.find({ artist });

        res.send({ artist, albums });
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res, next) => {
    try {
        const name = req.body.name;
        const artist = req.body.artist;
        const year = req.body.year;
        const file = req.file;

        if (!name || !artist || !year || !file) {
            return res.status(400).send({message: 'Field name, artist, image, year are required'});
        }

        const albumData = {
            name,
            artist,
            year,
            image: file.filename
        };

        const album = new Album(albumData);
        await album.save();

        res.send(album);
    } catch (e) {
        next(e);
    }
});

module.exports = router;