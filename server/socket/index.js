module.exports = (server) => {
  const io = require('socket.io')(server);
  io.on('connection', function(socket){
    console.log('socket connected');

    socket.emit('askGameId');
    socket.on('askGameId-Response', ({gameId}) => {
      socket.join(gameId);
    });

    socket.on('jingle', ({gameId, jingleType}) => {
      console.log('MESSAGE jingle', {gameId, jingleType})
      io.to(gameId).emit('jingle', {jingleType});
    });

    socket.on('buzz', ({team, gameId}) => {
      console.log(`MESSAGE buzz`, {team, gameId})
      io.to(gameId).emit('buzz', {team});
    })
  });


  return io;
}
