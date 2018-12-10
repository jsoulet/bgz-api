module.exports = (server) => {
  const io = require('socket.io')(server);
  io.on('connection', function(socket){
    console.log('socket connected');

    socket.emit('askGameId');
    socket.on('askGameId-Response', ({gameId}) => {
      socket.join(gameId);
    });

    socket.on('jingle', ({gameId, jingleType}) => {
      console.log('jingle recieved', {gameId, jingleType})
      io.to(gameId).emit('jingle', {jingleType});
    });
  });


  return io;
}
