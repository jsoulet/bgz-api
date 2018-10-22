const express = require('express');
const morgan = require('morgan');
const {
  get,
} = require('lodash');

let games = {
  '1': {id:'1', name: 'game1'},
  '2': {id:'2', name: 'game2'},
  '3': {id:'3', name: 'game3'},
  '4': {id:'4', name: 'game3'},
};

const app = express();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({
      data: {
        msg: 'server is working'
      }
    })
  });

app
  .get('/game/:gameId', (req, res) => {
      const game = get(games, req.params.gameId);
      console.log(games);
      if(!game) {
        return res.status(404).json({
          meta: {
            error: true,
            code: 404,
            msg: 'Page not found'
          },
        })
      }
      return res.status(200).json({
        data: {
          game: game
        }
      })

  })
  .get('/games', (req, res) => {
    res.json(games)
  })
  .post('/game', (req, res) => {
    const game = {
      id: Object.keys(games).length + 1,
      name: req.body.name,
    }

    games = {...games, [game.id]: game};

    res.json(game)
  })
  .get('/game/:gameId/:team/:points', (req, res) => {
    const {gameId, team, points} = req.params;
    if(!get(games, gameId)) {
      return res.status(404);
    }
    if(!['ketchup', 'mayo'].includes(team)) {
      return res.status(404);
    }
    const game = get(games, gameId)
    if(!game) {
      return res.status(404);
    }
    const teamPoints = get(game, team, 0);
    game[team] = teamPoints + parseInt(points);
    games = {...game, [game.id]: game}
    res.json({
      data: {
        game
      }
    })
  })


app.use(function(req, res, next){
  res.status(404).json({
    meta: {
      error: true,
      code: 404,
      msg: 'Page not found'
    },
    data: {

    }
  });
});

module.exports = app;
