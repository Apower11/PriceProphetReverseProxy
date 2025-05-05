const PORT = 8080;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config()


const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const options = {
    method: "GET",
    url: "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest",
    headers: {
      "X-CMC_PRO_API_KEY": process.env.APIKEY,
    },
    params: {
      slug: req.query.slug,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.get("/historicalcryptopricedata", (req, res) => {  
  const options = {
    method: "GET",
    url: `https://rest.coinapi.io/v1/exchangerate/${req.query.tickerSymbol}/USD/history?period_id=1DAY&limit=10000&time_start=${req.query.start_date}`,
    headers: {
      "X-CoinAPI-Key": "55A9326D-650B-4900-9B6B-7D6FC0DDFA4E"
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});