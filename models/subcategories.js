'use strict';
module.exports = (sequelize, DataTypes) => {
  const subcategory = sequelize.define(
    'subcategory',
    {
      id:
      {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      CatId:
      {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      Name:
      {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      Type:
      {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      }
    }, 
    {}
    );
  subcategory.associate = function (models) {
    // associations can be defined here
  };
  return subcategory;
};