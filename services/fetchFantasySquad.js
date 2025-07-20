const axios = require('axios');

const fetchFantasySquad = async (matchId) => {
  try {
    const url = `https://api.cricapi.com/v1/fantasy_squad?apikey=${process.env.CRICAPI_KEY}-b0a2-0b3a8907eaa3&id=${matchId}`;
    const response = await axios.get(url);

    if (response.data && response.data.status === 'success') {
      return response.data.data;
    } else {
      console.error("❌ CricAPI Error:", response.data?.reason || 'Unknown error');
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching fantasy squad:", error.message);
    return null;
  }
};

module.exports = fetchFantasySquad;
