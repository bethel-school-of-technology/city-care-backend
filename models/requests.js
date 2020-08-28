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
        required: true
      },
      details: {
        type: DataTypes.STRING,
        required: true
      },
      needByDate: {
        type: DataTypes.DATE,
        required: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        default: true
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
    requests.belongsTo(models.users, { foreignKey: 'user_id' });
  };
  return requests;
};
