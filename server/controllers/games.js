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
      .findAll()
      .then(games => res.status(200).send(games))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Game
      .findOne({where: {uuid: req.params.gameId}})
      .then(game => {
        if (!game) {
          return res.status(404).send({
            message: 'Game not found',
          });
        }
        return res.status(200).send(game);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Game
      .findOne({where :{ uuid: req.params.gameId}})
      .then(game => {
        if (!game) {
          return res.status(404).send({
            message: 'Game not found',
          });
        }
        return game
          .update({
            name: req.body.name || game.name
          })
          .then(() => res.status(200).send(game))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
}


module.exports = GameController
