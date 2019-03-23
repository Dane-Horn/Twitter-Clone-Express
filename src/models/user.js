'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: DataTypes.UUID,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        salt: DataTypes.STRING
    }, {});
    User.associate = function (models) {
        // associations can be defined here
        User.hasMany(models.Tweet)
    };
    return User;
};