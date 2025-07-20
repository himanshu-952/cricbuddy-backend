const fetchUpcomingMatches = require('../services/fetchUpcomingMatches');
const UpcomingMatch = require('../models/upcomingMatchModel');

const updateUpcomingMatches = async (req, res) => {
  try {
    const data = await fetchUpcomingMatches();

    if (!data || !Array.isArray(data)) {
      return res.status(404).json({ error: 'No upcoming matches found from CricAPI' });
    }

    const updatedMatches = [];

    for (const match of data) {
      const updated = await UpcomingMatch.findOneAndUpdate(
        { id: match.id },
        {
          id: match.id,
          dateTimeGMT: match.dateTimeGMT,
          matchType: match.matchType,
          status: match.status,
          ms: match.ms,
          t1: match.t1,
          t2: match.t2,
          t1s: match.t1s,
          t2s: match.t2s,
          t1img: match.t1img,
          t2img: match.t2img,
          series: match.series,
          lastUpdated: new Date()
        },
        { upsert: true, new: true }
      );

      updatedMatches.push(updated);
    }

    res.status(200).json(updatedMatches);
  } catch (err) {
    console.error('❌ Error updating upcoming matches:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = updateUpcomingMatches;
