const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return next(new AppError('Email not available', 400));
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return next(new AppError('Server error', 500));
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError('Invalid credentials', 400));
        }
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new AppError('Invalid credentials', 400));
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        return next(new AppError('Server error', 500));
    }
};
module.exports = { registerUser, loginUser };
