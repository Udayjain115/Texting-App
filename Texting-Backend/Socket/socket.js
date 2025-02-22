const { Server } = require('socket.io');

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = configureSocket;
