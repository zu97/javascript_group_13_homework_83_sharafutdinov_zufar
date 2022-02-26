const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    information: String
});

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;

