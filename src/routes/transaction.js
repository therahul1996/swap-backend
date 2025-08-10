const express = require("express");
const router = express.Router();
const { getTransaction } = require("../controllers/transactionController");

/**
 * @swagger
 * /transaction:
 *   get:
 *     summary: Get approve transaction data for a token
 *     tags: [Transaction]
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
 *         name: amount
 *         required: true
 *         schema:
 *           type: string
 *         description: Amount to approve (in token's smallest unit)
 *     responses:
 *       200:
 *         description: Transaction data
 *         content:
 *           application/json:
 *             example:
 *               to: "0x1111111254fb6c44bac0bed2854e76f90643097d"
 *               data: "0x095ea7b3..."
 *               value: "0"
 *       400:
 *         description: Missing required parameters
 */
router.get("/", getTransaction);

module.exports = router;
