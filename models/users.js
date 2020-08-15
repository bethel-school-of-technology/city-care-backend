'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users', 
    {
    id: 
    {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    FirstName: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    LastName: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    OrgName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ContactName: {
      type: DataTypes.STRING,
      required: false
    },
    Email: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    Phone: 
    {
      type: DataTypes.STRING
    },
    MobilePhone: 
    {
      type: DataTypes.STRING
    },
    Fax: {
      type: DataTypes.STRING,
      required: false
    },
    ContactMethod: 
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
      type: DataTypes.STRING      
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
    },
    Password: {
      type: DataTypes.STRING
    }
  }, 
  {}
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};