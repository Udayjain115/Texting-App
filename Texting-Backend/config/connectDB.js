const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);

    const url = process.env.MONGODB_URI;
    console.log('connecting to', url);
    await mongoose.connect(url);
    console.log('connected to MongoDB');
  } catch (error) {
    console.log('error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDB;
