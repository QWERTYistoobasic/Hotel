const mongoose = require('mongoose');
const axios = require('axios');
const cities = require('./cities');
const {places,descriptors } = require('./seedHelpers');
const hotel = require('../models/hotel');
mongoose.connect('mongodb://localhost:27017/hotel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
async function seedImg() {
    try {
      const resp = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'G3h48uLAYmLVYlE0spBwBBkPRhNRxAmb9fKYhbPK4R0',
          collections: 1114848,
        },
      })
      return resp.data.urls.small
    } catch (err) {
      console.error(err)
    }
  }
const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await hotel.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const hot = new hotel({
            author:'64ae60f30ca86deb57d75e0d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
              {
                url: 'https://res.cloudinary.com/dxoo5krbq/image/upload/v1689678103/hotelImages/gunm1dns866qnzqdhc5u.jpg',
                filename: 'hotelImages/gunm1dns866qnzqdhc5u',
                
              },
              {
                url: 'https://res.cloudinary.com/dxoo5krbq/image/upload/v1689678103/hotelImages/ktp2ioilz0bw1ne5ichg.jpg',
                filename: 'hotelImages/ktp2ioilz0bw1ne5ichg',
                
              }
            ],
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price
        })
        await hot.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

