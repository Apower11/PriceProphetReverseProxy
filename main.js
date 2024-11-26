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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});