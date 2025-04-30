const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Company = require('../Models/Company');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Extract the token
    const token = authHeader.replace('Bearer ', '');
    
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if it's a user or company token
    let user = await User.findById(decoded.id);
    let isCompany = false;
    
    // If not a user, check if it's a company
    if (!user) {
      user = await Company.findById(decoded.id);
      isCompany = true;
      
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
    }
    
    // Set user in request object
    req.user = {
      id: user._id,
      email: user.email,
      role: isCompany ? 'company' : (user.role || 'user')
    };
    
    req.token = token;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    } else {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ error: 'Authentication error' });
    }
  }
};

module.exports = auth;