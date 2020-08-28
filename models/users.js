'use strict';
module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
    const users = sequelize.define(
        'users', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            org_name: {
                type: DataTypes.STRING,
                required: false
            },
            contact_name: {
                type: DataTypes.STRING,
                required: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            email: {
                type: DataTypes.STRING,
                foreignKey: true,
                allowNull: false,
                unique: true,
                required: true
            },
            phone: {
                type: DataTypes.STRING,
                required: false
            },
            mobile_phone: {
                type: DataTypes.STRING,
                required: false
            },
            fax: {
                type: DataTypes.STRING,
                required: false
            },
            contact_method: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            address1: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            address2: {
                type: DataTypes.STRING,
                required: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            county: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            zip: {
                type: DataTypes.INTEGER,
                allowNull: false,
                required: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            isOrg: {
                type: DataTypes.BOOLEAN,
                default: false,
                required: false
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            admin: {
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
        }, {}
    );
    users.associate = function (models) {
        users.hasMany(models.requests, {
            foreignKey: 'user_id'
        })
        users.hasMany(models.listings, {
            foreignKey: 'org_id'
        })
    };
    return users;
};
=======
  const users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      org_name: {
        type: DataTypes.STRING,
        required: false
      },
      contact_name: {
        type: DataTypes.STRING,
        required: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      email: {
        type: DataTypes.STRING,
        foreignKey: true,
        allowNull: false,
        unique: true,
        required: true
      },
      phone: {
        type: DataTypes.STRING,
        required: false
      },
      mobile_phone: {
        type: DataTypes.STRING,
        required: false
      },
      fax: {
        type: DataTypes.STRING,
        required: false
      },
      contact_method: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      address1: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      address2: {
        type: DataTypes.STRING,
        required: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      county: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      zip: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      isOrg: {
        type: DataTypes.BOOLEAN,
        default: false,
        required: false
      },
      org_id: {
        type: DataTypes.INTEGER,
        required: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      admin: {
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
  users.associate = function (models) {
    users.hasMany(models.requests, { foreignKey: 'user_id' });
    users.hasMany(models.listings, { foreignKey: 'org_id' });
  };
  return users;
};
>>>>>>> 6792c19c5914ab96906c6f14cbe5a54f7410fe6e
