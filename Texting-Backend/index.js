require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userDetails');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user; // Attach decoded user info to request
    next(); // Proceed to the next middleware/route handler
  });
};

app.get('/api/users/:id', authenticateToken, async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user.toObject();
    response.json(userWithoutPassword);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    response.json({
      token,
      user: { id: user._id, email: user.email, firstName: user.firstName },
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.get('/api/users', async (request, response) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:email', async (request, response) => {
  try {
    const user = await User.findOne({ email: request.params.email });
    response.json(user);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (request, response) => {
  const body = request.body;

  if (!body.email || !body.password || !body.firstName) {
    return response.status(400).json({
      error: 'Email, password and name are required',
    });
  }

  let users = await User.find({});

  if (users.find((user) => user.email === body.email)) {
    return response.status(400).json({
      error: 'User with this email already exists',
    });
  }

  let hashedPw = await hashPassword(body.password);

  const user = new User({
    firstName: body.firstName,
    email: body.email,
    password: hashedPw,
  });

  try {
    const savedUser = await user.save();
    users = users.concat(savedUser);
    response.json(savedUser);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
