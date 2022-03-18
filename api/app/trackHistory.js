const express = require('express');
const mongoose = require('mongoose');
const TrackHistory = require('../models/TrackHistory');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
    try {
        const tracks = await TrackHistory
            .find({user: req.user._id})
            .populate({
                path: 'track',
                select: 'name',
                populate: {
                    path: 'album',
                    select: '_id',
                    populate: {
                        path: 'artist',
                        select: 'name'
                    }
                }
            })
            .sort({_id: -1});
        res.send(tracks);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, async (req, res, next) => {
    try {
        const track = req.body.track;
        const datetime = new Date().toISOString();

        const trackHistory = new TrackHistory({ user: req.user._id, track, datetime });
        await trackHistory.save();

        res.send({status: 'ok'});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);
    }
});

module.exports = router;