const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Stocks = Schema({
    name: {
        type: String,
        required: true,
    },
    exchange: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Stocks', Stocks);