const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Signup
exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashPass });
    await user.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Auth failed" });
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.status(404).json({ message: "Auth failed" });
    }
    const token = jwt.sign({ username: user.username, userId: user._id }, config.secret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
