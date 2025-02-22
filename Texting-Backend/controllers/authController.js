const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userDetails');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: { id: user._id, email: user.email, firstName: user.firstName },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login };
