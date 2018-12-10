const app = require('express')();
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('./server/socket')(server);

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//@TODO: needs to be after db query
app.put('/api/games/:gameId', (req, res, next) => {
  const gameId = req.params.gameId;
  io.to(gameId).emit('score', req.body);
  next()
});

require('./server/routes')(app, io);
app.get('*', (req, res) => res
  .status(200)
  .send({
    data: {
      message: 'Welcome to the beginning of nothingness.'}
    }
  )
);

module.exports = server;
