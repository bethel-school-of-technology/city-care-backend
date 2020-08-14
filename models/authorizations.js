'use strict';
module.exports = (sequelize, DataTypes) => {
  const Authorization = sequelize.define(
    'Authorization', 
    {
    Email: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
      required: true
    },
    Password: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    Role: 
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      required: true
    },
    Active: 
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      required: true
    }
  }, 
  {}
  );
  Authorization.associate = function(models) {
    // associations can be defined here
  };
  return Authorization;
};