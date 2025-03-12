const express = require('express');
const { createServer } = require('node:http');

const app = express();
const server = createServer(app);

app.get('/', (request, response) => {
  response.send('Hello World');
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
