const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xakqz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  retryWrites: true,
});

const connection = mongoose.connection;
connection.once('open', () =>
  console.log("mongoDB connection established successfully")
);

//middleware
app.use(express.json());
app.use(cors());

const stockRoutes = require('./route/stockRoutes');
app.use(stockRoutes);

// const stockController = require('./controller/stock-controller');
// app.get('/stocks', stockController.getStockData);

app.use((req, res) =>
  res.status(404).json({ "message": "Page not found" })
);

app.listen(PORT, () =>
  console.log(`your app is running on port ${PORT} enjoy developing`)
);