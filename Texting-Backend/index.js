const express = require('express');
const cors = require('cors');
const User = require('./models/userDetails');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

let users = [];

app.use(cors());
app.use(express.json());

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
}

app.get('/api/users', async (request, response) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (request, response) => {
  const body = request.body;

  if (!body.email || !body.password || !body.firstName) {
    return response.status(400).json({
      error: 'missing email, password or firstName',
    });
  }

  const users = await User.find({});

  if (users.find((user) => user.email === body.email)) {
    return response.status(400).json({
      error: 'email must be unique',
    });
  }

  const hashedPw = await hashPassword(body.password);

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
