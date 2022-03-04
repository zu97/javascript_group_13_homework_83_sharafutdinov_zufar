const express = require('express');
const mongoose = require('mongoose');
const TrackHistory = require('../models/TrackHistory');
const auth = require('../middleware/auth');

const router = express.Router();

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