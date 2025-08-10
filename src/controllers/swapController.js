const fetchWithRetry = require("../config/fetchWithRetry");
const API_URL = process.env.INCH_API_URL;

exports.getSwap = async (req, res) => {
  const {
    networkId,
    src,
    dst,
    amount,
    from,
    slippage,
    disableEstimate,
    allowPartialFill,
  } = req.query;
  if (!from) {
    return res.status(400).json({ error: "Missing wallet address" });
  }

  try {
    const url = `${API_URL}/${networkId}/swap`;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.INCH_API_KEY}`,
      },
      params: {
        src,
        dst,
        amount,
        from,
        slippage,
        disableEstimate,
        allowPartialFill,
      },
    };
    const response = await fetchWithRetry(url, options);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching swap:", error);
    if (error.response && error.response.data) {
      return res.status(error.response.status).json({
        error: error.response.data.error,
        description: error.response.data.description,
      });
    }
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};
