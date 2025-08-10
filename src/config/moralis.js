const Moralis = require("moralis").default;

module.exports = Moralis.start({
  apiKey: process.env.MORALIS_KEY,
});
