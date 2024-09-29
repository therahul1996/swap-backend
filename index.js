const express = require('express');
const Moralis = require('moralis').default;
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = 9001;

app.use(cors());
app.use(express.json());

app.get("/tokenPrice", async (req, res) => {
    const { query } = req;
    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
        address: query.addressOne
    })
    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
        address: query.addressTwo
    })
    const usdPrice = {
        tokenOne: responseOne.address,
        tokenTwo: responseTwo.address,
        ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice
    }
    return res.status(200).json(usdPrice)
})


Moralis.start({
    apiKey: process.env.MORALIS_KEY,
}).then(
    app.listen(port, function () {
        console.log('Server running')
    })
)
