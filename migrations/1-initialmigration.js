'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "listings", deps: [users]
 * createTable "requests", deps: [users]
 *
 **/

var info = {
<<<<<<< HEAD:migrations/1-initialmigration.js
    "revision": 1,
    "name": "initialmigration",
    "created": "2020-08-28T20:42:39.990Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "allowNull": false,
                    "autoIncrement": true
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name",
                    "required": true,
                    "allowNull": false
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name",
                    "required": true,
                    "allowNull": false
                },
                "org_name": {
                    "type": Sequelize.STRING,
                    "field": "org_name",
                    "required": false
                },
                "contact_name": {
                    "type": Sequelize.STRING,
                    "field": "contact_name",
                    "required": false
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username",
                    "required": true,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "required": true,
                    "unique": true,
                    "allowNull": false,
                    "foreignKey": true
                },
                "phone": {
                    "type": Sequelize.STRING,
                    "field": "phone",
                    "required": false
                },
                "mobile_phone": {
                    "type": Sequelize.STRING,
                    "field": "mobile_phone",
                    "required": false
                },
                "fax": {
                    "type": Sequelize.STRING,
                    "field": "fax",
                    "required": false
                },
                "contact_method": {
                    "type": Sequelize.STRING,
                    "field": "contact_method",
                    "required": true,
                    "allowNull": false
                },
                "address1": {
                    "type": Sequelize.STRING,
                    "field": "address1",
                    "required": true,
                    "allowNull": false
                },
                "address2": {
                    "type": Sequelize.STRING,
                    "field": "address2",
                    "required": false
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city",
                    "required": true,
                    "allowNull": false
                },
                "state": {
                    "type": Sequelize.STRING,
                    "field": "state",
                    "required": true,
                    "allowNull": false
                },
                "county": {
                    "type": Sequelize.STRING,
                    "field": "county",
                    "required": true,
                    "allowNull": false
                },
                "zip": {
                    "type": Sequelize.INTEGER,
                    "field": "zip",
                    "required": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "required": true,
                    "allowNull": false
                },
                "isOrg": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isOrg",
                    "required": false,
                    "default": false
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "default": false
                },
                "admin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "admin",
                    "default": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "listings",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "allowNull": false,
                    "autoIncrement": true
                },
                "quantity": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "availability": {
                    "type": Sequelize.STRING,
                    "field": "availability"
                },
                "requirements": {
                    "type": Sequelize.STRING,
                    "field": "requirements"
                },
                "category": {
                    "type": Sequelize.STRING,
                    "field": "category"
                },
                "sub_category": {
                    "type": Sequelize.STRING,
                    "field": "sub_category"
                },
                "org_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": true,
                    "field": "org_id",
                    "foreignKey": true
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "default": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "requests",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "required": true
                },
                "details": {
                    "type": Sequelize.STRING,
                    "field": "details",
                    "required": true
                },
                "date": {
                    "type": Sequelize.DATE,
                    "field": "date",
                    "required": true
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": true,
                    "field": "user_id",
                    "foreignKey": true
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "default": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
=======
  revision: 1,
  name: 'migrate',
  created: '2020-08-27T15:18:08.861Z',
  comment: ''
};

var migrationCommands = [
  {
    fn: 'createTable',
    params: [
      'categories',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          field: 'name',
          required: true,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false
        }
      },
      {}
    ]
  },
  {
    fn: 'createTable',
    params: [
      'subcategories',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        cat_id: {
          type: Sequelize.INTEGER,
          field: 'cat_id',
          foreignKey: true
        },
        name: {
          type: Sequelize.STRING,
          field: 'name',
          required: true,
          allowNull: false
        },
        type: {
          type: Sequelize.STRING,
          field: 'type',
          required: true,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false
        }
      },
      {}
    ]
  },
  {
    fn: 'createTable',
    params: [
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        first_name: {
          type: Sequelize.STRING,
          field: 'first_name',
          required: true,
          allowNull: false
        },
        last_name: {
          type: Sequelize.STRING,
          field: 'last_name',
          required: true,
          allowNull: false
        },
        org_name: {
          type: Sequelize.STRING,
          field: 'org_name',
          required: false
        },
        contact_name: {
          type: Sequelize.STRING,
          field: 'contact_name',
          required: false
        },
        username: {
          type: Sequelize.STRING,
          field: 'username',
          required: true,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          field: 'email',
          required: true,
          unique: true,
          allowNull: false,
          foreignKey: true
        },
        phone: {
          type: Sequelize.STRING,
          field: 'phone',
          required: false
        },
        mobile_phone: {
          type: Sequelize.STRING,
          field: 'mobile_phone',
          required: false
        },
        fax: {
          type: Sequelize.STRING,
          field: 'fax',
          required: false
        },
        contact_method: {
          type: Sequelize.STRING,
          field: 'contact_method',
          required: true,
          allowNull: false
        },
        address1: {
          type: Sequelize.STRING,
          field: 'address1',
          required: true,
          allowNull: false
        },
        address2: {
          type: Sequelize.STRING,
          field: 'address2',
          required: false
        },
        city: {
          type: Sequelize.STRING,
          field: 'city',
          required: true,
          allowNull: false
        },
        state: {
          type: Sequelize.STRING,
          field: 'state',
          required: true,
          allowNull: false
        },
        county: {
          type: Sequelize.STRING,
          field: 'county',
          required: true,
          allowNull: false
        },
        zip: {
          type: Sequelize.INTEGER,
          field: 'zip',
          required: true,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          field: 'password',
          required: true,
          allowNull: false
        },
        isOrg: {
          type: Sequelize.BOOLEAN,
          field: 'isOrg',
          required: false,
          default: false
        },
        org_id: {
          type: Sequelize.INTEGER,
          field: 'org_id',
          required: false
        },
        deleted: {
          type: Sequelize.BOOLEAN,
          field: 'deleted',
          default: false
        },
        admin: {
          type: Sequelize.BOOLEAN,
          field: 'admin',
          default: false
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false
        }
      },
      {}
    ]
  },
  {
    fn: 'createTable',
    params: [
      'listings',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        quantity: {
          type: Sequelize.INTEGER,
          field: 'quantity'
        },
        description: {
          type: Sequelize.STRING,
          field: 'description'
        },
        availability: {
          type: Sequelize.STRING,
          field: 'availability'
        },
        requirements: {
          type: Sequelize.STRING,
          field: 'requirements'
        },
        category: {
          type: Sequelize.STRING,
          field: 'category'
        },
        sub_category: {
          type: Sequelize.STRING,
          field: 'sub_category'
        },
        org_id: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
          references: {
            model: 'users',
            key: 'id'
          },
          allowNull: true,
          field: 'org_id',
          foreignKey: true
        },
        deleted: {
          type: Sequelize.BOOLEAN,
          field: 'deleted',
          default: false
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false
        }
      },
      {}
    ]
  },
  {
    fn: 'createTable',
    params: [
      'requests',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        description: {
          type: Sequelize.STRING,
          field: 'description',
          required: true
        },
        category: {
          type: Sequelize.STRING,
          field: 'category',
          required: true
        },
        sub_category: {
          type: Sequelize.STRING,
          field: 'sub_category',
          required: true
        },
        deleted: {
          type: Sequelize.BOOLEAN,
          field: 'deleted',
          default: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
          references: {
            model: 'users',
            key: 'id'
          },
          allowNull: true,
          field: 'user_id',
          foreignKey: true
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false
        }
      },
      {}
    ]
  }
>>>>>>> 6792c19c5914ab96906c6f14cbe5a54f7410fe6e:migrations/1-migrate.js
];

module.exports = {
  pos: 0,
  up: function (queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log('[#' + index + '] execute: ' + command.fn);
          index++;
          queryInterface[command.fn]
            .apply(queryInterface, command.params)
            .then(next, reject);
        } else resolve();
      }
      next();
    });
  },
  info: info
};
