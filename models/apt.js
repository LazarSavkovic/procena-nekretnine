const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = {toJSON: {virtuals: true}}

const aptSchema = new Schema({
    price: {
        type: Number,
        min: 0,
        // required: true
    },
    price_by_surface: Number,
    image: String,
    subtitle_places: [String],
    features: [String],
    sq_mt: {
        type: Number,
        min: 0,
        // required: true
    }, floor: {
        type: Number,
        min: 0,
    }, rooms: {
        type: Number,
        min: 0,
        // required: true
    }, short_description: String,
    title: String,
    date: String,
    lat: {
        type: Number,
        // required: true
    }, long: {
        type: Number,
        // required: true
    }
}, opts)

aptSchema.virtual("properties.popUpMarkup").get(function() {
    return `<a href="/apts/${this._id}" class="map-popup-link"><p class="lead">${this.title}</p></a><p>${this.price} €</p>`
});

module.exports = mongoose.model("Apt", aptSchema);
