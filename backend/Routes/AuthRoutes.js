const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    registerUser, 
    loginUser, 
    getProfile, 
    updateProfile, 
    changePassword, 
    verifyToken 
} = require('../Controllers/AuthControllers');
const auth = require('../Middleware/auth'); // Assuming you have an auth middleware

// Company routes
router.post('/register', register);
router.post('/login', login);

// User routes
router.post('/users/register', registerUser);
router.post('/users/login', loginUser);

// Protected routes (require authentication)
router.get('/profile', auth, getProfile);
router.patch('/profile', auth, updateProfile);
router.post('/change-password', auth, changePassword);
router.get('/verify-token', auth, verifyToken);

module.exports = router;