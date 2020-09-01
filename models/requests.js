'use strict';
module.exports = (sequelize, DataTypes) => {
  const requests = sequelize.define(
    'requests',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      needByDate: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        default: false
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
  requests.associate = function (models) {
    requests.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
  };
  return requests;
};
