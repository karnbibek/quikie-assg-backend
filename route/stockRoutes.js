const express = require("express");
const router = express.Router();

const stockController = require('../controller/stock-controller');

router.get('/getStocks', stockController.getStocksData);

router.post('/checkStocks', stockController.checkStocksData);

router.post('/postStocks', stockController.postStocksData);

router.post('/delete', stockController.deleteStock);

module.exports = router;