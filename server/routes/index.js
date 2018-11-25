const gameRouter = require('./games');

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

  gameRouter(app);

}
