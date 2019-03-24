'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { underscored: true, freezeTableName: true });
    User.associate = function (models) {
        // associations can be defined here
        User.hasMany(models.Tweet)
        User.hasMany(models.Retweet)
        User.hasMany(models.Following)
        User.hasMany(models.Following, { as: 'following', foreignKey: 'following_id' })
    };
    return User;
};