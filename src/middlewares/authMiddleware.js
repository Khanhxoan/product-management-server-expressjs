const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const ACCESS_TOKEN_SECRET =
    'd4abe6daaee9c9f58461d977cc79ae0cd1c8a67b1f2d1a02ed5df6b4de9d0675aaee5ce77abaed77615a0c2a4f12aa6e1ac280daa89c016b8f2dd8837deeadee';

exports.protect = async (req, res, next) => {
    let token;
    if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET || ACCESS_TOKEN_SECRET,
        );
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized' });
    }
};
