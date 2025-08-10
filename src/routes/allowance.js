const express = require("express");
const router = express.Router();
const { getAllowance } = require("../controllers/allowanceController");

/**
 * @swagger
 * /allowance:
 *   get:
 *     summary: Get token allowance for a wallet
 *     tags: [Allowance]
 *     parameters:
 *       - in: query
 *         name: networkId
 *         required: true
 *         schema:
 *           type: string
 *         description: Network ID
 *       - in: query
 *         name: tokenAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: Token contract address
 *       - in: query
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet address
 *     responses:
 *       200:
 *         description: Allowance data
 *         content:
 *           application/json:
 *             example:
 *               allowance: "1000000000000000000"
 *       400:
 *         description: Missing tokenAddress or walletAddress
 */
router.get("/", getAllowance);

module.exports = router;
