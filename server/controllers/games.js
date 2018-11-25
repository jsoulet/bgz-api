const randomstring = require('randomstring');

const Game = require('../models').Game;

const GameController = {
  create(req, res) {
    return Game
      .create({
        name: req.body.name,
        url: '123',
        // url: randomstring({
        //   capitalization: 'lowercase',
        //   charset: 'alphabetic',
        //   length: 12,
        //   readable: true,
        // }),
        ketchupMiams: 0,
        mayoMiams: 0,
      })
      .then(game => res.status(201).send(game))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Game
      .all()
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },
}


module.exports = GameController
