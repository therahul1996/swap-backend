const express = require("express");
const router = express.Router();
const { getTokenPrice } = require("../controllers/tokenPriceController");

/**
 * @swagger
 * /tokenPrice:
 *   get:
 *     summary: Get price ratio between two tokens
 *     tags: [Token Price]
 *     parameters:
 *       - in: query
 *         name: addressOne
 *         required: true
 *         schema:
 *           type: string
 *         description: Contract address of the first token
 *       - in: query
 *         name: addressTwo
 *         required: true
 *         schema:
 *           type: string
 *         description: Contract address of the second token
 *     responses:
 *       200:
 *         description: Token price comparison
 *         content:
 *           application/json:
 *             example:
 *               tokenOne:
 *                 address: "0x..."
 *                 usdPrice: 1800.5
 *               tokenTwo:
 *                 address: "0x..."
 *                 usdPrice: 1.0
 *               ratio: 1800.5
 *       400:
 *         description: Missing Address parameter
 */
router.get("/", getTokenPrice);

module.exports = router;
