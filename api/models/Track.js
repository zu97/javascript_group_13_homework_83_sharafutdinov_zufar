const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
});

const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;