'use strict';
module.exports = (sequelize, DataTypes) => {
    const Retweet = sequelize.define('Retweet', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        user_id: { type: DataTypes.UUID, allowNull: false },
        tweet_id: { type: DataTypes.UUID, allowNull: false }
    }, { underscored: true, freezeTableName: true });
    Retweet.associate = function (models) {
        // associations can be defined here
        Retweet.belongsTo(models.User)
        Retweet.belongsTo(models.Tweet)
    };
    return Retweet;
};