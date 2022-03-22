const mongoose = require('mongoose');
const config = require('./config');

const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');
const User = require('./models/User');
const {nanoid} = require("nanoid");

const run = async () => {
    await mongoose.connect(config.mongoConfig.url, config.mongoConfig.options);

    const collections = await mongoose.connection.db.listCollections().toArray();
    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [anna, john] = await User.create({
        email: 'anna@gmail.com',
        password: '123',
        displayName: 'Anna',
        role: 'user',
        token: nanoid()
    }, {
        email: 'john@gmail.com',
        password: '123',
        displayName: 'John',
        role: 'admin',
        token: nanoid()
    });

    const [michaelJackson, boneyM, alizee] = await Artist.create({
        user: john,
        name: 'Michael Jackson',
        image: 'michael-jackson.jpg',
        information: 'Michael Joseph Jackson was an American singer, songwriter and dancer. Dubbed the "King of Pop", he is regarded as one of the most significant cultural figures of the 20th century. Over a four-decade career, his contributions to music, dance and fashion, along with his publicized personal life, made him a global figure in popular culture. Jackson influenced artists across many music genres; through stage and video performances, he popularized complicated dance moves such as the moonwalk, to which he gave the name, as well as the robot. He is the most awarded individual music artist in history.',
        isPublished: true
    }, {
        user: anna,
        name: 'Boney M.',
        image: 'boney-m.jpg',
        information: 'Boney M. was a Euro-Caribbean vocal group created by German record producer Frank Farian, who was the group\'s primary songwriter. Originally based in West Germany, the four original members of the group\'s official line-up were Liz Mitchell and Marcia Barrett from Jamaica, Maizie Williams from Montserrat and Bobby Farrell from Aruba. The group was formed in 1976 and achieved popularity during the disco era of the late 1970s. Since the 1980s, various line-ups of the band have performed with different personnel.'
    }, {
        user: anna,
        name: 'Alizée Jacotey',
        image: 'alizee.jpg',
        information: 'Alizée Jacotey (born 21 August 1984), known professionally as Alizée, is a French singer, dancer and musician. She was born and raised in Ajaccio, Corsica.',
        isPublished: true
    });

    const [thriller, christmas, nightflight, gourmandises, tout] = await Album.create({
        user: john,
        artist: michaelJackson,
        name: 'Thriller',
        image: 'thriller.jpg',
        year: 1982,
        isPublished: true
    }, {
        user: john,
        artist: boneyM,
        name: 'Christmas Album',
        image: 'christmas.jpg',
        year: 1981
    }, {
        user: anna,
        artist: boneyM,
        name: 'Nightflight to Venus',
        image: 'nightflight.jpg',
        year: 1978
    }, {
        user: anna,
        artist: alizee,
        name: 'Gourmandises',
        image: 'gourmandises.jpg',
        year: 2000
    }, {
        user: john,
        artist: alizee,
        name: 'Tout Alizée',
        image: 'tout.jpg',
        year: 2007,
        isPublished: true
    });

    await Track.create({
        user: john,
        name: 'Wanna Be Startin’ Somethin’',
        album: thriller,
        duration: '6:03',
    }, {
        user: john,
        name: 'The Girl Is Mine',
        album: thriller,
        duration: '3:42',
        isPublished: true
    }, {
        user: john,
        name: 'Baby Be Mine',
        album: thriller,
        duration: '4:20',
        isPublished: true
    }, {
        user: anna,
        name: 'Billie Jean',
        album: thriller,
        duration: '4:54'
    }, {
        user: anna,
        name: 'Human Nature',
        album: thriller,
        duration: '4:06',
        isPublished: true
    }, {
        user: anna,
        name: 'Little Drummer Boy',
        album: christmas,
        duration: '4:27'
    }, {
        user: anna,
        name: 'White Christmas',
        album: christmas,
        duration: '4:19'
    }, {
        user: anna,
        name: 'Feliz Navidad',
        album: christmas,
        duration: '3:09'
    }, {
        user: john,
        name: 'Jingle Bells',
        album: christmas,
        duration: '2:55'
    }, {
        user: john,
        name: 'Winter Fairy Tale',
        album: christmas,
        duration: '2:59'
    }, {
        user: john,
        name: 'Mary\'s Boy Child/Oh My Lord',
        album: christmas,
        duration: '5:10',
        youtube: 'https://www.youtube.com/embed/cmm1gt_2SkQ'
    }, {
        user: anna,
        name: 'Nightflight to Venus',
        album: nightflight,
        duration: '4:46'
    }, {
        user: john,
        name: 'Rasputin',
        album: nightflight,
        duration: '5:51',
        youtube: 'https://www.youtube.com/embed/16y1AkoZkmQ'
    }, {
        user: anna,
        name: 'Painter Man',
        album: nightflight,
        duration: '3:16',
        youtube: 'https://www.youtube.com/embed/STVrEsscBss'
    }, {
        user: anna,
        name: 'He Was a Steppenwolf',
        album: nightflight,
        duration: '6:52'
    }, {
        user: anna,
        name: 'King of the Road',
        album: nightflight,
        duration: '2:36'
    }, {
        user: john,
        name: 'Rivers of Babylon',
        album: nightflight,
        duration: '4:17'
    }, {
        user: john,
        name: 'Moi... Lolita',
        album: gourmandises,
        duration: '4:26'
    }, {
        user: john,
        name: 'Lui ou toi',
        album: gourmandises,
        duration: '4:18',
        youtube: 'https://www.youtube.com/embed/e1JmO9i4ylg'
    }, {
        user: anna,
        name: 'Mon maquis',
        album: gourmandises,
        duration: '5:45',
    }, {
        user: anna,
        name: 'Parler tout bas',
        album: gourmandises,
        duration: '4:43',
        youtube: 'https://www.youtube.com/embed/QouhRxPE_Po'
    }, {
        user: john,
        name: 'Veni Vedi Vici',
        album: gourmandises,
        duration: '4:22'
    }, {
        user: john,
        name: 'Gourmandises',
        album: tout,
        duration: '4:15'
    }, {
        user: john,
        name: 'J.B.G.',
        album: tout,
        duration: '4:00',
        isPublished: true
    }, {
        user: john,
        name: 'Parler tout bas',
        album: tout,
        duration: '4:43'
    }, {
        user: anna,
        name: 'J\'en ai marre !',
        album: tout,
        duration: '5:12',
        isPublished: true
    }, {
        user: anna,
        name: 'Youpidou',
        album: tout,
        duration: '4:05',
        youtube: 'https://www.youtube.com/embed/kb_eyNgT8as',
        isPublished: true
    }, {
        user: anna,
        name: 'Hey ! Amigo !',
        album: tout,
        duration: '3:55'
    });

    await mongoose.connection.close();
};
run().catch((e) => console.error(e));