// const Score = require('../models/product-model');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

class AuthController {
    login = async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user || !(await user.comparePassword(password))) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = generateToken(user._id);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            });

            res.status(200).json({ message: 'Login successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    register = async (req, res) => {
        const { username, password, avatarUrl } = req.body;
        try {
            const userExists = await User.findOne({ username });
            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const user = await User.create({
                username,
                password,
                avatarUrl,
            });

            const token = generateToken(user._id);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            });

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    logout = (req, res) => {
        res.clearCookie('accessToken');
        res.status(200).json({ message: 'Logout successful' });
    };
}

module.exports = new AuthController();
