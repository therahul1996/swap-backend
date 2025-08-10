const axios = require("axios");
const API_URL = process.env.INCH_API_URL;

exports.getAllowance = async (req, res) => {
  const { networkId, tokenAddress, walletAddress } = req.query;
  if (!tokenAddress || !walletAddress) {
    return res
      .status(400)
      .json({ error: "Missing tokenAddress or walletAddress" });
  }

  try {
    const response = await axios.get(
      `${API_URL}/${networkId}/approve/allowance`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.INCH_API_KEY}`,
        },
        params: { tokenAddress, walletAddress },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching allowance:", error);
    res.status(500).json({ error: "Error fetching allowance" });
  }
};
