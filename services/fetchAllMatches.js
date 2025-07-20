const axios = require('axios');

module.exports = allMatches = async () => {
  try {
    const response = await axios.get(
      `https://api.cricapi.com/v1/currentMatches?apikey=${process.env.CRICAPI_KEY}-b0a2-0b3a8907eaa3&offset=0`
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching matches from CricAPI:", error.message);
    return null;
  }
};
 