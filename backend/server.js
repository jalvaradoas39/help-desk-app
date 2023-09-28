const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./database/connection');
const ticketRoutes = require('./routes/ticket');

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/ticket', ticketRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
