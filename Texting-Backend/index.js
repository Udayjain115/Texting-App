require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const app = express();

const port = 3000;

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
