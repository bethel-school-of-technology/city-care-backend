'use strict';
module.exports = (sequelize, DataTypes) => {
  const Authorization = sequelize.define(
    'Authorization', 
    {
    email: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
      required: true
    },
    password: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    role: 
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      required: true
    },
    active: 
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      required: true
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
  Authorization.associate = function(models) {
    // associations can be defined here
  };
  return Authorization;
};