'use strict';
module.exports = (sequelize, DataTypes) => {
  const organizations = sequelize.define(
    'organizations', 
    {
    id: 
    {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    OrgName: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    ContactName: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    Phone: 
    {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false
    },
    Fax: 
    {
      type: DataTypes.INTEGER
    },
    Email: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    Address1: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    Address2: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    City: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    State: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    County: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    Zip: 
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true
    }
  }, 
  {}
  );
  organizations.associate = function(models) {
    // associations can be defined here
  };
  return organizations;
};