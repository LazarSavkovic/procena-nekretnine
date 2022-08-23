const path = require('path');
const mongoose = require("mongoose");
const Apt = require("../models/apt");
const apartments = require("./apartments.json")


mongoose.connect("mongodb://localhost:27017/procena-nekretnine", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
})

const seedDB = async function () {
    await Apt.deleteMany({});
    await Apt.insertMany(apartments);
};

seedDB().then(() => {
    db.close();
})