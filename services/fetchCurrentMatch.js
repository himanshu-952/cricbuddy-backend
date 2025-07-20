const { default: axios } = require('axios');

const fetchCurrentMatch = async (matchId) => {
  try {
    const apiKey = `${process.env.CRICAPI_KEY}-b0a2-0b3a8907eaa3`; // manually append
    const response = await axios.get(
      `https://api.cricapi.com/v1/match_info?apikey=${apiKey}&id=${matchId}`
    );

    console.log("🔄 CricAPI Response:", response.data);

    return response.data.data; // extract match object
  } catch (e) {
    console.error("❌ Failed to fetch current match:", e.message);
    return null;
  }
};

module.exports = fetchCurrentMatch;
