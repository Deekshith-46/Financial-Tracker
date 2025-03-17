const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    // Get the token from the request headers
    let token = req.headers.authorization?.split(" ")[1];

    // If no token is found, return an error response
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user from the database and exclude the password field
        req.user = await User.findById(decoded.id).select('-password');

        // Move to the next middleware
        next();
    } catch (err) {
        // If token verification fails, return an error response
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};
