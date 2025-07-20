const fetchFantasySquad = require("../services/fetchFantasySquad");
const FantasySquad = require("../models/fantasySquadModel");

const updateFantasySquad = async (req, res) => {
  try {
    const matchId = req.params.id;

    const apiData = await fetchFantasySquad(matchId);

    if (!apiData || apiData.status !== "success" || !apiData.data) {
      return res.status(404).json({ error: "Fantasy squad not found" });
    }

    for (const team of apiData.data) {
      await FantasySquad.findOneAndUpdate(
        { teamName: team.teamName, matchId },
        { ...team, matchId },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: "Fantasy squad saved successfully" });
  } catch (err) {
    console.error("Controller Error:", err.message);
    res.status(500).json({ error: "Failed to save fantasy squad" });
  }
};

module.exports = updateFantasySquad;
