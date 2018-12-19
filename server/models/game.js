'use strict';
module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define('Game', {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ketchupMiams: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    mayoMiams: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    isBuzzerEnabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    buzzerValue: {
      type: Sequelize.BOOLEAN,
    }
  }, {});

  return Game;
};
