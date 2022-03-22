const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const config = require('../config');
const Artist = require('../models/Artist');
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const identify = require("../middleware/identify");
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
const upload = multer({storage});

router.get('/', identify, async (req, res, next) => {
    try {
        let orQuery = [{isPublished: true}];
        if (req.user && req.user.role === 'admin') {
            orQuery.push({isPublished: false});
        } else if (req.user) {
            orQuery.push({user: req.user._id});
        }

        const artists = await Artist.find({$or: orQuery});
        res.send(artists);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        const artistData = {
            user: req.user._id,
            name: req.body.name,
            information: req.body.information
        };

        if (req.file) {
            artistData.image = req.file.filename
        }

        if (req.user.role === 'admin') {
            artistData.isPublished = true;
        }

        const artist = new Artist(artistData);
        await artist.save();

        res.send(artist);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).send({error: 'Page not found'});
        }

        artist.isPublished = true;
        await artist.save();

        return res.send(artist);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).send({error: 'Page not found'});
        }

        await artist.remove();
        return res.send({message: 'OK'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;