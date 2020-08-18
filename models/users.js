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
      allowNull: false,
      required: false
    },
    ContactName: {
      type: DataTypes.STRING,
      required: false
    },
    Username: {
      type: DataTypes.STRING,
      required: true
    },
    Email: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    Phone: 
    {
      type: DataTypes.STRING,
      required: false
    },
    MobilePhone: 
    {
      type: DataTypes.STRING,
      required: false
    },
    Fax: {
      type: DataTypes.STRING,
      required: false
    },
    ContactMethod: 
    {
      type: DataTypes.STRING,
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
      required: false      
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
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    Admin: {
      type: DataTypes.BOOLEAN,
      default: false,
      required: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, 
  {}
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};