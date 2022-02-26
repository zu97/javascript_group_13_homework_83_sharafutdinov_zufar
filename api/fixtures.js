const mongoose = require('mongoose');
const config = require('./config');

const Artist = require('./models/Artist');
const Album = require('./models/Album');

const run = async () => {
    await mongoose.connect(config.mongoConfig.url, config.mongoConfig.options);

    const collections = await mongoose.connection.db.listCollections().toArray();
    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [michaelJackson, boneyM, alizee] = await Artist.create({
        name: 'Michael Jackson',
        image: 'michael-jackson.jpg',
        information: 'Michael Joseph Jackson was an American singer, songwriter and dancer. Dubbed the "King of Pop", he is regarded as one of the most significant cultural figures of the 20th century. Over a four-decade career, his contributions to music, dance and fashion, along with his publicized personal life, made him a global figure in popular culture. Jackson influenced artists across many music genres; through stage and video performances, he popularized complicated dance moves such as the moonwalk, to which he gave the name, as well as the robot. He is the most awarded individual music artist in history.'
    }, {
        name: 'Boney M.',
        image: 'boney-m.jpg',
        information: 'Boney M. was a Euro-Caribbean vocal group created by German record producer Frank Farian, who was the group\'s primary songwriter. Originally based in West Germany, the four original members of the group\'s official line-up were Liz Mitchell and Marcia Barrett from Jamaica, Maizie Williams from Montserrat and Bobby Farrell from Aruba. The group was formed in 1976 and achieved popularity during the disco era of the late 1970s. Since the 1980s, various line-ups of the band have performed with different personnel.'
    }, {
        name: 'Alizée Jacotey',
        image: 'alizee.jpg',
        information: 'Alizée Jacotey (born 21 August 1984), known professionally as Alizée, is a French singer, dancer and musician. She was born and raised in Ajaccio, Corsica.'
    });

    await Album.create({
        artist: michaelJackson,
        name: 'Thriller',
        image: 'thriller.jpg',
        year: 1982
    }, {
        artist: boneyM,
        name: 'Christmas Album',
        image: 'christmas.jpg',
        year: 1981
    }, {
        artist: boneyM,
        name: 'Nightflight to Venus',
        image: 'nightflight.jpg',
        year: 1978
    }, {
        artist: alizee,
        name: 'Gourmandises',
        image: 'gourmandises.jpg',
        year: 2000
    }, {
        artist: alizee,
        name: 'Tout Alizée',
        image: 'tout.jpg',
        year: 2007
    });

    await mongoose.connection.close();
};
run().catch((e) => console.error(e));