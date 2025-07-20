const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const route = require('./routes/routes.js'); // ✅ your custom filename
const authRoutes = require('./routes/authRoutes');
const fantasySquadRoute = require("./routes/fantasySquadRoute");
const fantasyRoutes = require('./routes/fantasyRoutes');
const cors= require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://cricbuddy-frontend.vercel.app',
  credentials: true,
}));

// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// Route mounting
app.use('/api', route);
app.use('/api/auth', authRoutes);
app.use("/api", fantasySquadRoute);
app.use(fantasyRoutes);
// Home route
app.get('/', (req, res) => {
  res.send('🏏 CricBuddy backend is live!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
