// Path: backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization']; // Get token from Authorization header
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      req.user = decoded; // Attach user info to request object

      // Check for role authorization if roles are specified
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient rights' });
      }

      next(); // Proceed to next middleware/handler
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = auth;
