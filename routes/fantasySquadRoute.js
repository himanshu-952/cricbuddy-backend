const express = require("express");
const router = express.Router();
const updateFantasySquad = require("../controllers/fantasySquadController");
const authenticateUser = require("../middleware/authMiddleware");

// 🔒 Protected Route
router.get("/fantasy-squad/:id", authenticateUser, updateFantasySquad);

module.exports = router;
