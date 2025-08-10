const fetchWithRetry = require("../config/fetchWithRetry");
const API_URL = process.env.INCH_API_URL;

exports.getTransaction = async (req, res) => {
  const { networkId, tokenAddress, amount } = req.query;
  if (!networkId || !tokenAddress || !amount) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const url = `${API_URL}/${networkId}/approve/transaction`;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.INCH_API_KEY}`,
      },
      params: { tokenAddress, amount },
    };
    const response = await fetchWithRetry(url, options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching approve transaction:", error);
    res.status(500).json({ error: "Error fetching approve transaction" });
  }
};
