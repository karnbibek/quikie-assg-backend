const Stocks = require('../model/stock-model');

exports.getStocksData = async (req, res, next) => {
    let stocks;
    try {
        stocks = await Stocks.find();
    } catch (err) {
        return res.status(500).json({
            message: "Fetching stocks failed!!, Please try again."
        });
    }
    if (!stocks) {
        res.status(200).json({ "message": "hello!!" });
    }
    res.status(200).json({ stocks });
};

exports.checkStocksData = async (req, res, next) => {
    const { name, symbol, currency, exchange } = req.body;
    let stocks;
    try {
        stocks = await Stocks.findOne({ name, symbol, currency, exchange });
    } catch (err) {
        return res.status(500).json({
            message: "Fetching stocks failed!!, Please try again."
        });
    }

    if (stocks) {
        res.status(200).json(true);
    } else {
        res.status(200).json(false);
    }
    
};

exports.postStocksData = async (req, res, next) => {
    const { name, symbol, currency, exchange } = req.body;
    let stocks;
    try {
        stocks = await Stocks.findOne({ name, symbol, currency, exchange });
    } catch (err) {
        return res.status(500).json({
            message: "Fetching stocks failed!!, Please try again."
        });
    }

    if (stocks) {
        res.status(200).json({ "message": "Stock already exists!!" });
    }

    const stock = new Stocks({ name, symbol, currency, exchange });

    try {
        await stock.save();
    } catch (err) {
        return res.status(500).json({
            message: "Saving stocks failed!!, Please try again."
        });
    }

    res.status(200).json({ "message": "Stock saved successfully!!" });
};

exports.deleteStock = async (req, res, next) => {
    const { name, symbol, currency, exchange } = req.body;
    if (!name || !symbol || !currency || !exchange) {
        res.status(422).json({ "message": "Please select valid data to delete." })
    }

    let stock;
    await Stocks.findOneAndDelete({ name, symbol, currency, exchange }, (err, company) => {
        if (err) {
            return res.status(422).json({ message: "Some unknown error occurred while deleting company!" });
        }
        res.status(200).json({ message: "Company deleted successfully" });
    });
}
