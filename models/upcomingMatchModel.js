const mongoose = require('mongoose');

const upcomingMatchSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  dateTimeGMT: String,
  matchType: String,
  status: String,
  ms: String, 
  t1: String,
  t2: String, 
  t1s: String, 
  t2s: String, 
  t1img: String, 
  t2img: String, 
  series: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const UpcomingMatch = mongoose.model('UpcomingMatch', upcomingMatchSchema);

module.exports = UpcomingMatch;
