'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Authorizations", deps: []
 * createTable "categories", deps: []
 * createTable "listings", deps: []
 * createTable "requests", deps: []
 * createTable "subcategories", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "firstMigration",
    "created": "2020-08-21T17:14:21.537Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Authorizations",
            {
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "required": true,
                    "foreignKey": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "required": true,
                    "allowNull": false
                },
                "role": {
                    "type": Sequelize.BOOLEAN,
                    "field": "role",
                    "required": true,
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.BOOLEAN,
                    "field": "active",
                    "required": true,
                    "allowNull": false
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
            "categories",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "allowNull": false,
                    "autoIncrement": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "required": true,
                    "allowNull": false
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
                    "field": "quantity",
                    "required": true,
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description",
                    "required": true,
                    "allowNull": false
                },
                "availability": {
                    "type": Sequelize.STRING,
                    "field": "availability",
                    "required": true,
                    "allowNull": false
                },
                "requirements": {
                    "type": Sequelize.STRING,
                    "field": "requirements",
                    "required": true,
                    "allowNull": false
                },
                "category": {
                    "type": Sequelize.STRING,
                    "field": "category",
                    "required": true,
                    "allowNull": false
                },
                "sub_category": {
                    "type": Sequelize.STRING,
                    "field": "sub_category",
                    "required": true,
                    "allowNull": false
                },
                "org_id": {
                    "type": Sequelize.INTEGER,
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
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description",
                    "required": true,
                    "allowNull": false
                },
                "category": {
                    "type": Sequelize.STRING,
                    "field": "category",
                    "required": true,
                    "allowNull": false
                },
                "sub_category": {
                    "type": Sequelize.STRING,
                    "field": "sub_category",
                    "required": true,
                    "allowNull": false
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "default": false
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "foreignKey": true
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
            "subcategories",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "allowNull": false,
                    "autoIncrement": true
                },
                "cat_id": {
                    "type": Sequelize.INTEGER,
                    "field": "cat_id",
                    "foreignKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "required": true,
                    "allowNull": false
                },
                "type": {
                    "type": Sequelize.STRING,
                    "field": "type",
                    "required": true,
                    "allowNull": false
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
                    "allowNull": false
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
                "role": {
                    "type": Sequelize.BOOLEAN,
                    "field": "role",
                    "required": false,
                    "default": false
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "required": false,
                    "default": false
                },
                "admin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "admin",
                    "required": false,
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
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
