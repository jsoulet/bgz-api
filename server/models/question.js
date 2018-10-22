'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    content: DataTypes.JSON,
    type: DataTypes.STRING
  }, {});
  Question.associate = function(models) {
    Question.hasMany(models.Game, {
      as: 'games'
    });
  };
  return Question;
};
