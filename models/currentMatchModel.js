const mongoose = require('mongoose');

const currentMatchSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },

  name: String,
  matchType: String,
  status: String,
  venue: String,
  date: String,
  dateTimeGMT: String,

  teams: [String],

  teamInfo: [
    {
      name: String,
      shortname: String,
      img: String
    }
  ],

  score: [
    {
      r: Number,
      w: Number,
      o: mongoose.Schema.Types.Mixed, // Can be a float or string like "19.2"
      inning: String
    }
  ],

  tossWinner: String,
  tossChoice: String,
  matchWinner: String,

  series_id: String,
  fantasyEnabled: Boolean,
  bbbEnabled: Boolean,
  hasSquad: Boolean,
  matchStarted: Boolean,
  matchEnded: Boolean,

  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CurrentMatch', currentMatchSchema);
