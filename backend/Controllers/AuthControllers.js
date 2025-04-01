const Company = require('../Models/Company');
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

module.exports = {
    login,
    register
}