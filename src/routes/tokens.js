const express = require("express");
const router = express.Router();
const { getTokens } = require("../controllers/tokensController");

/**
 * @swagger
 * /tokens:
 *   get:
 *     summary: Get list of tokens from a specific network
 *     tags: [Tokens]
 *     parameters:
 *       - in: query
 *         name: networkId
 *         required: true
 *         schema:
 *           type: string
 *         description: Network ID to fetch tokens from
 *     responses:
 *       200:
 *         description: List of tokens
 *         content:
 *           application/json:
 *             example:
 *               tokens:
 *                 - symbol: ETH
 *                   name: Ethereum
 *                   address: "0x0000000000000000000000000000000000000000"
 *       400:
 *         description: Missing Network ID parameter
 */
router.get("/", getTokens);

module.exports = router;
