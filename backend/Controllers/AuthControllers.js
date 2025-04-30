const Company = require('../Models/Company');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { companyName, email, password, industry, token } = req.body;

    // Verify registration token
    if (token !== 'carbonminus') {
      return res.status(400).json({ error: 'Invalid registration token' });
    }

    // Check if company already exists
    const existingCompany = await Company.findOne({ 
      $or: [{ email }, { companyName }] 
    });

    if (existingCompany) {
      return res.status(400).json({ error: 'Company already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new company
    const company = await Company.create({
      companyName,
      email,
      password: hashedPassword,
      industry,
      registrationToken: token
    });

    // Generate JWT token
    const authToken = jwt.sign(
      { id: company._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token: authToken,
      company: {
        id: company._id,
        companyName: company.companyName,
        email: company.email,
        industry: company.industry
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Find company
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, company.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: company._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      company: {
        id: company._id,
        companyName: company.companyName,
        email: company.email,
        industry: company.industry
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

// User registration function
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password, // Password will be hashed by pre-save middleware in the model
      role: role || 'user'
    });

    // Generate JWT token
    const token = user.generateAuthToken();

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = user.generateAuthToken();

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    // req.user should be set by auth middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    let profile;
    if (req.user.role === 'company') {
      profile = await Company.findById(req.user.id).select('-password');
    } else {
      profile = await User.findById(req.user.id).select('-password');
    }

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user/company profile
const updateProfile = async (req, res) => {
  try {
    // Only allow updating specific fields
    const allowedUserUpdates = ['name', 'email'];
    const allowedCompanyUpdates = ['companyName', 'industry', 'email'];
    
    const updates = Object.keys(req.body);
    const isValidOperation = 
      req.user.role === 'company' 
        ? updates.every(update => allowedCompanyUpdates.includes(update))
        : updates.every(update => allowedUserUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    let profile;
    if (req.user.role === 'company') {
      profile = await Company.findById(req.user.id);
    } else {
      profile = await User.findById(req.user.id);
    }

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Update the fields
    updates.forEach(update => profile[update] = req.body[update]);
    await profile.save();

    // Remove password from response
    const profileObj = profile.toObject();
    delete profileObj.password;

    res.json({ profile: profileObj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    let user;
    if (req.user.role === 'company') {
      user = await Company.findById(req.user.id).select('+password');
    } else {
      user = await User.findById(req.user.id).select('+password');
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword; // Will be hashed by pre-save middleware
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify token and refresh if valid
const verifyToken = async (req, res) => {
  try {
    // Token verification should be done by auth middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Generate new token
    let token;
    if (req.user.role === 'company') {
      const company = await Company.findById(req.user.id);
      token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    } else {
      const user = await User.findById(req.user.id);
      token = user.generateAuthToken();
    }

    res.json({ valid: true, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    login,
    register,
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    changePassword,
    verifyToken
};