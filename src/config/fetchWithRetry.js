const axios = require("axios");

module.exports = async function fetchWithRetry(
  url,
  options,
  retries = 3,
  delay = 1000
) {
  try {
    return await axios.get(url, options);
  } catch (error) {
    if (retries > 0 && error.response && error.response.status === 429) {
      console.log(`Retrying request... (${retries} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw error;
  }
};
