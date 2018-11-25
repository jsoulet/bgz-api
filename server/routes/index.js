const gameController = require('../controllers/games');

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res
      .status(200)
      .send({
        data: {
          message: 'server is working'
        }
      })
  });

  app.post('/api/games', gameController.create )
}
