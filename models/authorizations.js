'use strict';
module.exports = (sequelize, DataTypes) => {
  const authorizations = sequelize.define(
    'authorizations', 
    {
    email: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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
      default: false,
      required: true
    },
    active: 
    {
      type: DataTypes.BOOLEAN,
      required: true,
      default: false
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, 
  {}
  );
authorizations.associate = function(models) {
  authorizations.hasMany(models.users, { foreignKey: 'email'})
  }
  return authorizations;
};