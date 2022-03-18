const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const config = require('../config');
const Artist = require('../models/Artist');
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
        const artists = await Artist.find();
        res.send(artists);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res, next) => {
    try {
        const name = req.body.name;
        const file = req.file;

        if (!name || !file) {
            return res.status(400).send({message: 'The name and image fields are required'});
        }

        const artistData = {
            name,
            image: file.filename,
            information: req.body.information || null
        };

        const artist = new Artist(artistData);
        await artist.save();

        res.send(artist);
    } catch (e) {
        next(e);
    }
});

module.exports = router;