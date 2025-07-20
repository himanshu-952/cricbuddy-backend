const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  id: String,
  name: String,
  role: String,
  battingStyle: String,
  bowlingStyle: String,
  country: String,
  playerImg: String
});

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  shortname: String,
  img: String,
  players: [playerSchema]
});

const fantasySquadSchema = new mongoose.Schema({
  matchId: { type: String, required: true, unique: true },
  teams: [teamSchema],
  lastUpdated: { type: Date, default: Date.now }
});

const FantasySquad = mongoose.model('FantasySquad', fantasySquadSchema);

module.exports = FantasySquad;
