const gameController = require('../controllers/games');

module.exports = (app) => {
  app.post('/api/games', gameController.create);
  app.get('/api/games/:gameId', gameController.retrieve);
  app.get('/api/games', gameController.list);
  app.put('/api/games/:gameId', gameController.update);
  app.delete('/api/games/:gameId', gameController.destroy);
}
