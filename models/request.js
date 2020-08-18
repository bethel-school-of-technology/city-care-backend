'use strict';
module.exports = (sequelize, DataTypes) => {
  const request = sequelize.define(
    'request', 
    {
    id: 
    {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Description: 
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
    Deleted: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    UserId: 
    {
      type: DataTypes.INTEGER,
      foreignKey: true
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
  request.associate = function(models) {
    // associations can be defined here
  };
  return request;
};