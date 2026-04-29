const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, phone, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ success: false, message: 'User with this phone number already exists' });
    }

    // Create user
    // In a real app, hash password!
    user = await User.create({
      name,
      phone,
      email: `${phone}@kisansetu.com`, // Fallback email
      password,
      role: role || 'farmer'
    });

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const isDbConnected = require('mongoose').connection.readyState === 1;

    // Validate phone
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Please provide a phone number' });
    }

    // FALLBACK: If DB is not connected, allow login with any number for demo
    if (!isDbConnected) {
      console.warn('⚠️  Database not connected. Using demo login fallback.');
      return res.status(200).json({
        success: true,
        data: {
          _id: 'demo_user_id',
          name: 'Demo Farmer',
          phone: phone,
          role: 'farmer',
          isDemo: true
        }
      });
    }

    // Validate phone & password
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Please provide a phone number' });
    }

    // Check for user
    // For demo purposes, we'll allow any phone number if it's 10 digits
    let user = await User.findOne({ phone }).select('+password');

    if (!user) {
        // Auto-register for demo if not found
        user = await User.create({
            name: 'Kisan User',
            phone,
            email: `${phone}@kisansetu.com`,
            password: 'password123',
            role: 'farmer'
        });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
