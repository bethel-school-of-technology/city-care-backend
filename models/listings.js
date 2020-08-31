'use strict';
module.exports = (sequelize, DataTypes) => {
    const listings = sequelize.define(
        'listings', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            quantity: {
                type: DataTypes.INTEGER,
            },
            description: {
                type: DataTypes.STRING,
            },
            availability: {
                type: DataTypes.STRING,
            },
            requirements: {
                type: DataTypes.STRING,
            },
            /* category: {
                type: DataTypes.STRING,
            },
            sub_category: {
                type: DataTypes.STRING,
            }, */
            //test github branch
            org_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {}
    );
    listings.associate = function (models) {
        listings.belongsTo(models.users, {
            foreignKey: 'org_id'
        })
    };
    return listings;
};