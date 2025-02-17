const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let users = [];

app.use(cors());
app.use(express.json());

app.get('/api/users', (request, response) => {
  response.json(users);
});

app.post('/api/users', (request, response) => {
  const body = request.body;
  const User = {
    email: body.email,
    password: body.password,
    firstName: body.firstName,
  };

  users = users.concat(User);
  response.json(User);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
