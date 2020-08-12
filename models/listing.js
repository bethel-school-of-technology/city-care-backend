'use strict';
module.exports = (sequelize, DataTypes) => {
  const listing = sequelize.define(
    'listing', 
    {
    id: 
    {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    Quantity: 
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true
    },
    Description: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    Availability: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    Requirements: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    Category: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    SubCategory: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    OrgId: 
    {
      type: DataTypes.INTEGER,
      foreignKey: true
    }
  }, 
  {}
  );
  listing.associate = function(models) {
    // associations can be defined here
  };
  return listing;
};