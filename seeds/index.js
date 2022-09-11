if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


const path = require('path');
const mongoose = require("mongoose");
const Apt = require("../models/apt");
const apartments = require("./data_science/apartments.json")

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/procena-nekretnine";

console.log(dbUrl)
mongoose.connect(dbUrl, {
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