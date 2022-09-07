const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = {toJSON: {virtuals: true}}

const flatSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }, location: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        min: 0,
        // required: true
    },
    // price_by_surface: Number,
    image: String,
    // subtitle_places: [String],
    // features: [String],
    sq_mt: {
        type: Number,
        min: 0,
        // required: true
    }, rooms: {
        type: Number,
        min: 0,
        // required: true
    }, floor: {
        type: Number,
        min: 0
    }, short_description: String,
    title: String,
    date: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, opts)

flatSchema.virtual("properties.popUpMarkup").get(function() {
    return `<a href="/apts/${this._id}" ><h4>${this.title}</h4></a><p>Procenjena vrednost: ${this.value} €</p>`
});


module.exports = mongoose.model("Flat", flatSchema);
