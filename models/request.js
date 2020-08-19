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
    description: 
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
    deleted: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    user_id: 
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