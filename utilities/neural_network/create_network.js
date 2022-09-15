const brain = require("brainjs");
const fs = require("fs");
const { apts, prices } = require("./cleaning_data")
const { normalize, denormalize, normalizePrice, denormalizePrice, scaledApts, scaledPrices, trainingData } = require("./scaling.js")

const net = new brain.NeuralNetwork({ hiddenLayers: [40, 40] });


// , { learningRate: 0.005, errorThresh: 0.02, log: (stats) => console.log(stats) }
const stats = net.train(trainingData);

console.log(stats);


const networkState = net.toJSON();
fs.writeFileSync("network_state.json", JSON.stringify(networkState), "utf-8");


