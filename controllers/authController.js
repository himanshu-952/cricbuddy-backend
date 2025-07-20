const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//  Register User
const register = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { username, email, password } = req.body;

    //  Field validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //  Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Password length
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    //  Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    // Hash password & save
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: " User registered successfully",
      username: user.username
    });

  } catch (err) {
    res.status(500).json({ error: "❌ Server error: " + err.message });
  }
};

//  Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check if both fields exist
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    //  Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    //  Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    //  Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "✅ Login successful",
      token,
      username: user.username
    });

  } catch (err) {
    res.status(500).json({ error: "❌ Server error: " + err.message });
  }
};

module.exports = { register, login };
