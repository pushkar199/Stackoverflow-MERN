require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.register = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({
                err: "Not all fields have been entered"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                err: "Password should be more than 6 characters"
            });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                err: 'Account already exists'
            });
        }
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashPassword,
            name
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide an email and a password."
            });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log("token ", token);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.logout = async (req, res) => {
    try {
        // Any logout logic you want to implement
        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(400).json({ error: "Error in logging out" });
    }
};
