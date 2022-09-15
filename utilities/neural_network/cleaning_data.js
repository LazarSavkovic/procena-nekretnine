const apartments = require("./apartments.json");

const maxLat = 44.898722;
const minLat = 44.689438;
const maxLong = 20.624471;
const minLong = 20.216603;

const maxPrice = 600000;
const minPrice = 10000;


const apts = [];
const prices = [];
for (let apartment of apartments) {
    if ((apartment.lat > minLat && apartment.lat < maxLat) && (apartment.long > minLong && apartment.long < maxLong)
        && (apartment.price > minPrice && apartment.price < maxPrice)) {
        const apt = {};
        apt.sq_mt = apartment.sq_mt;
        apt.rooms = apartment.rooms;
        apt.long = apartment.long;
        apt.lat = apartment.lat;
        apts.push(apt);

        const price = {};
        price.price = apartment.price;
        prices.push(price);
    }

};

console.log(`Length of all apartments downloaded from Halo Oglasi is ${apartments.length}`);
console.log(`Length of all apartments after removing outliers is ${apts.length}`);

module.exports.apts = apts;
module.exports.prices = prices;