const brain = require('brainjs');
const fs = require("fs");
const { apts, prices } = require("./cleaning_data")
const { normalize, denormalize, normalizePrice, denormalizePrice, scaledApts, scaledPrices, trainingData } = require("./scaling.js")

const net = new brain.NeuralNetwork();

// Load the trained network data from JSON file.
const networkState = JSON.parse(fs.readFileSync("network_state.json", "utf-8"));
net.fromJSON(networkState);
console.log(trainingData);


for (let i = 0; i < 30; i++) {
    let j = i * 10;
    console.log(j)
    let prediction = denormalizePrice(net.run(scaledApts[j]));
    console.log(prediction)
    console.log(`Apartment ${apts[j].sq_mt, apts[j].rooms, apts[j].long, apts[j].lat} with the price of ${prices[j].price}:`)
    console.log(`Is predicted to be worth ${prediction.price}`)
    console.log("---------------------------------------")
}