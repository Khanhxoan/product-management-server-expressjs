// const Score = require('../models/product-model');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        'd4abe6daaee9c9f58461d977cc79ae0cd1c8a67b1f2d1a02ed5df6b4de9d0675aaee5ce77abaed77615a0c2a4f12aa6e1ac280daa89c016b8f2dd8837deeadee',
        {
            expiresIn: '30m',
        },
    );
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
                secure: true,
                maxAge: 3600000,
            });

            res.status(200).json({
                user: {
                    username: user.username,
                    role: user.role,
                    avatarUrl: user.avatarUrl,
                },
                message: 'Login successfully',
            });
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
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    };
}

module.exports = new AuthController();
