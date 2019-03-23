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
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Retweets');
    }
};