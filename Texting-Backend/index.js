require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/connectDB');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const port = 3000;
const configureSocket = require('./Socket/socket');

const app = express();

// Create ONE server that both Express and Socket.IO will use
const server = http.createServer(app);
configureSocket(server);

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).send('Something went wrong');
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
