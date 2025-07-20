const express = require('express');
const router = express.Router();

// Controllers
const updateAllMatches = require('../controllers/allMatchController');
const updateCurrentMatch = require('../controllers/currentMatchController');
const upcomingMatches= require('../controllers/upcomingMatchController');
// all-matches
router.get('/all-matches', updateAllMatches);

//current-match/:id
router.get('/current-match/:id', updateCurrentMatch);

// upcoming matches
router.get('/upcoming-matches' , upcomingMatches );
module.exports = router;
