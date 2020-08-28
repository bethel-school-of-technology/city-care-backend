'use strict';
module.exports = (sequelize, DataTypes) => {
  const requests = sequelize.define(
    'requests',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        required: true
      },
      needByDate: {
        type: DataTypes.DATE,
        required: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      user_id: {
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
  requests.associate = function (models) {
    requests.belongsTo(models.users, { foreignKey: 'user_id' });
  };
  return requests;
};
