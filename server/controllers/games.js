const randomstring = require('randomstring');

const {isNumber, isEmpty, isUndefined} = require('lodash');
const Game = require('../models').Game;

const GameController = {
  create(req, res) {
    return Game
      .create({
        name: req.body.name,
        url: randomstring.generate({
          capitalization: 'lowercase',
          charset: 'alphanumeric',
          length: 5,
          readable: true,
        }),
        ketchupMiams: 0,
        mayoMiams: 0,
      })
      .then(game => res.json(game))
      .catch(error => res.status(400).json(error));
  },

  list(req, res) {
    if(req.query && req.query.code) {
      return Game
        .findOne({where: {url: req.query.code.replace(/[^\w.]+/g, '')}})
        .then(game => {
          if(isEmpty(game)) {
            return res.status(404).json({
              message: 'Game not found',
            });
          }
          return res.json(game)
        })
        .catch(error => res.status(404).send(error));
    }
    return Game
      .findAll()
      .then(games => res.json(games))
      .catch(error => res.status(400).json(error));
  },

  retrieve(req, res) {
    return Game
      .findOne({where: {uuid: req.params.gameId}})
      .then(game => {
        if (!game) {
          return res.json({
            message: 'Game not found',
          });
        }
        return res.status(200).json(game);
      })
      .catch(error => res.status(400).json(error));
  },

  update(req, res) {
    return Game
      .findOne({where :{ uuid: req.params.gameId}})
      .then(game => {
        if (!game) {
          return res.status(404).json({
            message: 'Game not found',
          });
        }

        game.name = req.body.name || game.name;

        if(isNumber(req.body.ketchupMiams)) {
          game.ketchupMiams = req.body.ketchupMiams
        }

        if(isNumber(req.body.mayoMiams)) {
          game.mayoMiams = req.body.mayoMiams
        }

        if(!isUndefined(req.body.isBuzzerEnabled)) {
          game.isBuzzerEnabled = req.body.isBuzzerEnabled;
        }

        if(req.body.buzzerValue) {
          game.buzzerValue = req.body.buzzerValue;
        }

        return game
          .save()
          .then(() => res.json(game))
          .catch((error) => res.status(400).json(error));
      })
      .catch((error) => res.status(400).json(error));
  },

  destroy(req, res) {
    return Game
      .findOne({where: {uuid: req.params.gameId}})
      .then(game => {
        if(!game) {
          return res.status(404).json({
            message: 'Game not found'
          })
        }
        return game
          .destroy()
          .then(() => res.json(game))
          .catch((error) => res.status(400).json(error));
      })
      .catch((error) => res.status(400).json(error));
  }
}


module.exports = GameController
