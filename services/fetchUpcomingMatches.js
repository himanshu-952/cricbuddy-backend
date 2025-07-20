const axios = require('axios');

const fetchUpcomingMatches = async () => {
  try {
    const API_KEY = `${process.env.CRICAPI_KEY}-b0a2-0b3a8907eaa3`;

    const response = await axios.get(
  `https://api.cricapi.com/v1/cricScore?apikey=${API_KEY}`
);


    // Filter only future matches (fixtures)
    const upcomingMatches = response.data.data.filter(
      (match) =>
        match.status === 'Match not started' ||
        match.matchStarted === false ||
        match.ms === 'fixture'
    );

    return upcomingMatches;
  } catch (err) {
    console.error("❌ Error fetching upcoming matches:", err.message);
    return [];
  }
};

module.exports = fetchUpcomingMatches;
