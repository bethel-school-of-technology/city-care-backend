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
            allowNull: false,
            required: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        availability: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        requirements: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        org_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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