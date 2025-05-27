// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.protect = async (req, res, next) => {
//     // Get the token from the request headers
//     let token = req.headers.authorization?.split(" ")[1];

//     // If no token is found, return an error response
//     if (!token) {
//         return res.status(401).json({ message: "Not authorized, no token" });
//     }

//     try {
//         // Verify the token using the secret key
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Find the user from the database and exclude the password field
//         req.user = await User.findById(decoded.id).select('-password');

//         // Move to the next middleware
//         next();
//     } catch (err) {
//         // If token verification fails, return an error response
//         res.status(401).json({ message: "Not authorized, token failed" });
//     }
// };


const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Check for guest token
      if (token === 'guest-token') {
        req.user = { id: 'guest-id' }; // Mock user for guest login
        return next();
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};