const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aptSchema = new Schema({
    price: {
        type: Number,
        min: 0,
        required: true
    },
    price_by_surface: Number,
    image: String,
    subtitle_places: [String],
    features: [String],
    sq_mt: {
        type: Number,
        min: 0,
        required: true
    }, rooms: {
        type: Number,
        min: 0,
        required: true
    }, short_description: String,
    title: String,
    date: String,
    lat: {
        type: Number,
        required: true
    }, long: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Apt", aptSchema);
