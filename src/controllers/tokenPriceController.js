const Moralis = require("moralis").default;

exports.getTokenPrice = async (req, res) => {
  const { query } = req;
  if (!query.addressOne || !query.addressTwo) {
    return res
      .status(400)
      .json({ error: "Both addressOne and addressTwo are required" });
  }
  try {
    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
      address: query.addressOne,
    });
    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
      address: query.addressTwo,
    });

    const usdPrice = {
      tokenOne: responseOne.address,
      tokenTwo: responseTwo.address,
      ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
    };
    return res.status(200).json(usdPrice);
  } catch (error) {
    console.error(
      "Error fetching token price:",
      error?.response?.data || error.message
    );
    res.status(error?.response?.status || 500).json({
      error: "Failed to fetch token price",
      details: error?.response?.data || error.message,
    });
  }
};
