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
    UserId: 
    {
      type: DataTypes.INTEGER,
      foreignKey: true
    }
  }, {});
  request.associate = function(models) {
    // associations can be defined here
  };
  return request;
};