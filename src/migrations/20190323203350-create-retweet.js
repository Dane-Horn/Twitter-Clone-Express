'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Retweets', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            user_id: {
                allowNull: false,
                type: Sequelize.UUID
            },
            tweet_id: {
                allowNull: false,
                type: Sequelize.UUID
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Retweets');
    }
};