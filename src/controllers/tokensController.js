const axios = require("axios");
const API_URL = process.env.INCH_API_URL;

exports.getTokens = async (req, res) => {
  const { networkId } = req.query;
  if (!networkId) {
    return res.status(400).json({ error: "Missing Network ID parameter" });
  }
  try {
    const response = await axios.get(`${API_URL}/${networkId}/tokens`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.INCH_API_KEY}`,
      },
    });
    res.status(200).json(response.data.tokens || response.data);
  } catch (error) {
    console.error(
      "Error fetching tokens:",
      error?.response?.data || error.message
    );
    res.status(error?.response?.status || 500).json({
      error: "Error fetching tokens",
      details: error?.response?.data || error.message,
    });
  }
};
