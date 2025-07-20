const fetchCurrentMatch = require('../services/fetchCurrentMatch');
const CurrentMatch = require('../models/currentMatchModel');

const updateCurrentMatch = async (req, res) => {
  try {
    const matchId = req.params.id;
   console.log("Requested Match ID:", matchId);
   
    const matchData = await fetchCurrentMatch(matchId);

    if (!matchData) {
      return res.status(404).json({ error: 'Match not found from CricAPI' });
    }

    //  Save or update in DB
    const updatedMatch = await CurrentMatch.findOneAndUpdate(
      { id: matchData.id },
      {
        id: matchData.id,
        name: matchData.name,
        matchType: matchData.matchType,
        status: matchData.status,
        venue: matchData.venue,
        date: matchData.date,
        dateTimeGMT: matchData.dateTimeGMT,
        teams: matchData.teams,
        teamInfo: matchData.teamInfo,
        score: matchData.score,
        tossWinner: matchData.tossWinner,
        tossChoice: matchData.tossChoice,
        matchWinner: matchData.matchWinner,
        series_id: matchData.series_id,
        fantasyEnabled: matchData.fantasyEnabled,
        bbbEnabled: matchData.bbbEnabled,
        hasSquad: matchData.hasSquad,
        matchStarted: matchData.matchStarted,
        matchEnded: matchData.matchEnded,
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    );

    // 3. Respond with the DB document
    res.json(updatedMatch);
  } catch (error) {
    console.error(' Error in currentMatchController:', error.message);
    res.status(500).json({ error: 'Failed to fetch or save current match' });
  }
};

module.exports = updateCurrentMatch;
