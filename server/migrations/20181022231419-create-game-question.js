module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Games_Questions',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defauktValue: Sequelize.UUIDV4,
        },
        gameId: {
          type: Sequelize.UUID,
          references: {
            model: 'Games',
            key: 'id'
          },
          allowNull: false
        },
        orderId: {
          type: Sequelize.UUID,
          references: {
            model: 'Questions',
            key: 'id'
          },
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
  )},
down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Games_Questions')
  }
};
