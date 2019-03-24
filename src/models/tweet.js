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
        Tweet.belongsTo(models.User)
        Tweet.hasMany(models.Retweet)
    };
    return Tweet;
};