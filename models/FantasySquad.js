const mongoose = require('mongoose');

// Define the schema
const FantasySquadSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true
  },
  selectedPlayers: {
    type: [String],
    required: true
  },
  userId: {
    type: String, // Optional: store the ID or email of the user
    required: false
  }
}, {
  timestamps: true
});

// ✅ Prevent OverwriteModelError on hot reload or repeated import
const FantasySquad = mongoose.models.FantasySquad || mongoose.model('FantasySquad', FantasySquadSchema);

module.exports = FantasySquad;
