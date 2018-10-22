const express = require('express');
const morgan = require('morgan');

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
