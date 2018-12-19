'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'Games',
        'isBuzzerEnabled',
        Sequelize.BOOLEAN
      ),
      queryInterface.addColumn(
        'Games',
        'buzzerValue',
        Sequelize.STRING
      )];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn(
        'Games',
        'isBuzzerEnabled'
      ),
      queryInterface.removeColumn(
        'Games',
        'buzzerValue'
      )];
  }
};
