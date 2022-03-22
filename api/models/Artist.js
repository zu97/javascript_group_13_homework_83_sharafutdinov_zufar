const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    information: {
        type: String
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;

