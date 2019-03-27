'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tweet = sequelize.define('Tweet', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        text: DataTypes.TEXT,
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        references: {
            type: DataTypes.UUID,
            defaultValue: null
        }
    }, { underscored: true, freezeTableName: true });
    Tweet.associate = function (models) {
        // associations can be defined here
        Tweet.hasMany(models.Tweet, { foreignKey: 'references', as: 'replies', onDelete: 'CASCADE', hooks: true });
        Tweet.belongsTo(models.Tweet, { foreignKey: 'references', as: 'parent' });
        Tweet.belongsTo(models.User, { as: 'user' });
        Tweet.hasMany(models.Retweet, { onDelete: 'CASCADE', hooks: true });
    };
    return Tweet;
};