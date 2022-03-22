const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    youtube: {
        type: String,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;