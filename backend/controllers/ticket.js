const Ticket = require('../models/Tickets');

const createTicket = async (req, res) => {
  const { name, email, description } = req.body;

  try {
    let ticket = new Ticket();
    ticket.name = name;
    ticket.email = email;
    ticket.description = description;

    await ticket.save();

    res.status(200).json({
      successMsg: 'Ticket was successfully created',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMsg: 'Please try again later',
    });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});

    res.json({
      tickets,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMsg: 'Please try again later',
    });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);

    res.json({
      ticket,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMsg: 'Please try again later',
    });
  }
};

const updateTicketById = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const oldTicket = await Ticket.findByIdAndUpdate(ticketId, req.body);

    res.status(200).json({
      oldTicket,
      successMsg: 'Ticket successfully updated!',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMsg: 'Please try again later',
    });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketById,
};
