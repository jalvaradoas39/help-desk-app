const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log('Database successfully connected');
    })
    .catch((err) => {
      console.log('Error connecting to database', err);
    });
};

module.exports = { connectDB };
