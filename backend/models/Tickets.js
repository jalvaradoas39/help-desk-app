const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'New',
    },
    response: {
      type: String,
    },
  },
  { timestamps: true }
);

// note: mongoose will automatically lowercase & pluralize collection name
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
