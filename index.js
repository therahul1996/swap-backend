const express = require('express');
const Moralis = require('moralis').default;
const app = express();
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config()
const port = process.env.PORT || 9001;
const axios = require('axios');
app.use(cors());
app.use(express.json());
async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
    try {
        return await axios.get(url, options);
    } catch (error) {
        if (retries > 0 && error.response && error.response.status === 429) {
            console.log(`Retrying request... (${retries} attempts left)`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries - 1, delay * 2); // Exponential backoff
        }
        throw error; // Rethrow error if retries are exhausted or it's a different error
    }
}

const transactionLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 10, // Limit each IP to 10 requests per minute
    message: 'Too many requests, please try again later.',
});

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
app.get('/allowance', async (req, res) => {
    const { networkId, tokenAddress, walletAddress } = req.query;

    if (!tokenAddress || !walletAddress) {
        return res.status(400).json({ error: 'Missing tokenAddress or walletAddress' });
    }

    try {
        const response = await axios.get(`https://api.1inch.dev/swap/v6.0/${networkId}/approve/allowance`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${process.env.INCH_API_KEY}`,
            },
            params: {
                tokenAddress,
                walletAddress,
            },
        });

        // Send back the allowance data from the API response
        res.json(response.data);
    } catch (error) {
        // Handle errors from API request
        console.error('Error fetching allowance:', error);
        res.status(500).json({ error: 'Error fetching allowance' });
    }
});
app.get('/transaction', transactionLimiter, async (req, res) => {
    const { networkId, tokenAddress, amount } = req.query;

    if (!networkId || !tokenAddress || !amount) {
        return res.status(400).json({ error: 'Missing networkId' });
    }

    try {
        const url = `https://api.1inch.dev/swap/v6.0/${networkId}/approve/transaction`;
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.INCH_API_KEY}`,
            },
            params: {
                tokenAddress,
                amount,
            },
        };

        // Use the retry function
        const response = await fetchWithRetry(url, options);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching approve transaction:', error);
        res.status(500).json({ error: 'Error fetching approve transaction' });
    }
});
app.get('/transaction', async (req, res) => {
    const { networkId } = req.query;

    if (!networkId) {
        return res.status(400).json({ error: 'Missing networkId' });
    }

    try {
        const url = `https://api.1inch.dev/swap/v6.0/${networkId}/approve/transaction`;
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.INCH_API_KEY}`,
            },
        };

        // Use the retry function
        const response = await fetchWithRetry(url, options);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching approve transaction:', error);
        res.status(500).json({ error: 'Error fetching approve transaction' });
    }
});
// app.get('/transaction', async (req, res) => {
//     const { networkId } = req.query;

//     // Validate that required query parameters are present
//     if (!networkId) {
//         return res.status(400).json({ error: 'Missing networkId' });
//     }

//     try {
//         const response = await axios.get(`https://api.1inch.dev/swap/v6.0/${networkId}/approve/transaction`, {
//             headers: {
//                 'accept': 'application/json',
//                 'Authorization': `Bearer ${process.env.INCH_API_KEY}`,
//             },
//             params: {},
//         });

//         // Send back the allowance data from the API response
//         res.json(response.data);

//     } catch (error) {
//         // Handle errors from API request
//         console.error('Error fetching approve transaction:', error);
//         res.status(500).json({ error: 'Error fetching approve transaction:' });
//     }
// });
Moralis.start({
    apiKey: process.env.MORALIS_KEY,
}).then(
    app.listen(port, function () {
        console.log('Server running')
    })
)
