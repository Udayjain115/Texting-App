const Message = require('../models/messageDetails');

const createMessage = async (req, res) => {
  const { message, sender, date } = req.body;

  if (!message || !sender || !date) {
    return res.status(400).json({
      error: 'Message, sender and date are required',
    });
  }
  try {
    const sentMessage = new Message({
      message: message,
      sender: sender,
      date: date,
    });

    const savedMessage = await sentMessage.save();
    res.json(savedMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMessages,
  createMessage,
};
