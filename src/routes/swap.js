const express = require("express");
const router = express.Router();
const { getSwap } = require("../controllers/swapController");

/**
 * @swagger
 * /swap:
 *   get:
 *     summary: Get swap transaction data between two tokens
 *     tags: [Swap]
 *     parameters:
 *       - in: query
 *         name: networkId
 *         required: true
 *         schema:
 *           type: string
 *         description: Network ID
 *       - in: query
 *         name: src
 *         required: true
 *         schema:
 *           type: string
 *         description: Source token address
 *       - in: query
 *         name: dst
 *         required: true
 *         schema:
 *           type: string
 *         description: Destination token address
 *       - in: query
 *         name: amount
 *         required: true
 *         schema:
 *           type: string
 *         description: Amount to swap (in smallest unit)
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet address initiating the swap
 *       - in: query
 *         name: slippage
 *         required: false
 *         schema:
 *           type: number
 *         description: Slippage percentage
 *       - in: query
 *         name: disableEstimate
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Disable swap estimation
 *       - in: query
 *         name: allowPartialFill
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Allow partial order fills
 *     responses:
 *       200:
 *         description: Swap transaction data
 *         content:
 *           application/json:
 *             example:
 *               fromToken:
 *                 symbol: USDC
 *                 address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
 *               toToken:
 *                 symbol: ETH
 *                 address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
 *               tx:
 *                 to: "0x1111111254fb6c44bac0bed2854e76f90643097d"
 *                 data: "0x..."
 *       400:
 *         description: Missing wallet address
 */
router.get("/", getSwap);

module.exports = router;
