'use strict';
module.exports = (sequelize, DataTypes) => {
    const Following = sequelize.define('Following', {
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        following_id: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, { underscored: true });
    Following.associate = function (models) {
        // associations can be defined here
        Following.belongsTo(models.User);
        Following.belongsTo(models.User, { as: 'following_user' });
    };
    return Following;
};