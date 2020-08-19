'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    'category', 
    {
    id: 
    {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: 
    {
      type: DataTypes.STRING,
      allowNull: false, 
      required: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, 
  {}
  );
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};