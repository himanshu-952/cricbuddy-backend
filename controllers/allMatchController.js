const allMatchesService = require('../services/fetchAllMatches');
const AllMatch = require('../models/allMatchModel');

const updateAllMatches = async (req, res) => {
  try {
    const apiData = await allMatchesService();

    if (!apiData || !apiData.data) {
      return res.status(500).json({ error: "❌ Failed to fetch match data from CricAPI" });
    }

    const matches = apiData.data;


    await AllMatch.deleteMany({});

    for (const match of matches) {
      if (!match.matchEnded) {
        await AllMatch.create({
          id: match.id,
          name: match.name,
          matchType: match.matchType,
          status: match.status,
          venue: match.venue,
          date: match.date,
          dateTimeGMT: match.dateTimeGMT,
          teams: match.teams,
          teamInfo: match.teamInfo,
          score: match.score,
          series_id: match.series_id,
          fantasyEnabled: match.fantasyEnabled,
          bbbEnabled: match.bbbEnabled,
          hasSquad: match.hasSquad,
          matchStarted: match.matchStarted,
          matchEnded: match.matchEnded,
          lastUpdated: new Date()
        });
      }
    }


    const updatedMatches = await AllMatch.find({});
    res.json(updatedMatches);
    
  } catch (error) {
    console.error("❌ Error in updateAllMatches controller:", error.message);
    res.status(500).json({ error: "Something went wrong updating All Matches" });
  }
};

module.exports = updateAllMatches;
