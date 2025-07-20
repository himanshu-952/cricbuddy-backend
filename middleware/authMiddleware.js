const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // 1. Get token from header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user info to request
    req.user = {
      userId: decoded.userId,
      username: decoded.username
    };

    next(); // continue to controller
  } catch (err) {
    res.status(401).json({ error: 'Token is invalid or expired' });
  }
};

module.exports = authenticateUser;
