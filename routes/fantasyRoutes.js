const express = require('express');
const router = express.Router();
const FantasySquad = require('../models/FantasySquad');
const authenticateToken = require('../middleware/authMiddleware');

// POST /submit-squad
router.post('/submit-squad', authenticateToken, async (req, res) => {
  const { matchId, selectedPlayers } = req.body;

  if (!matchId || !selectedPlayers || selectedPlayers.length !== 11) {
    return res.status(400).json({ message: 'Invalid squad submission' });
  }

  try {
    const squad = new FantasySquad({
      userId: req.user.id,
      matchId,
      selectedPlayers,
    });

    await squad.save();
    res.status(201).json({ message: 'Squad saved successfully', squad });
  } catch (err) {
    res.status(500).json({ message: 'Error saving squad', error: err.message });
  }
});

module.exports = router;
