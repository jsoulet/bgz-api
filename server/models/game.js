'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
  }, {});
  Game.associate = function(models) {
    Game.hasMany(models.Question, {
      as: 'questions'
    });
  };
  return Game;
};
