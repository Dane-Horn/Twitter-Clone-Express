'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Tweet', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            user_id: {
                allowNull: false,
                type: Sequelize.UUID
            },
            text: {
                type: Sequelize.TEXT
            },
            likes: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            references: {
                type: Sequelize.UUID,
                defaultValue: null
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
        return queryInterface.dropTable('Tweet');
    }
};