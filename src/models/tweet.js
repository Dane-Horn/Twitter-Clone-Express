'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tweet = sequelize.define('Tweet', {
        id: DataTypes.UUID,
        user_id: DataTypes.UUID,
        text: DataTypes.TEXT,
        likes: DataTypes.INTEGER,
        references: DataTypes.UUID,
        created_at: DataTypes.DATE
    }, {});
    Tweet.associate = function (models) {
        // associations can be defined here
        Tweet.belongsTo(models.User)
    };
    return Tweet;
};