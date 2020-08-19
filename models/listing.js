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
    quantity: 
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true
    },
    description: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    availability: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    requirements: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    category: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    sub_category: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    org_id: 
    {
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
  }, 
  {}
  );
  listing.associate = function(models) {
    // associations can be defined here
  };
  return listing;
};