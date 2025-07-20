const mongoose = require('mongoose');

const allMatchSchema = new mongoose.Schema({
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
      o: Number,
      inning: String
    }
  ],

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

module.exports = mongoose.model('AllMatch', allMatchSchema);
