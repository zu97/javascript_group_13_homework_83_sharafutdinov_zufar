const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false
    },
});

const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;