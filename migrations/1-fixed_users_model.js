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
    "name": "fixed_users_model",
    "created": "2020-08-19T12:03:47.861Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Authorizations",
            {
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "required": true,
                    "foreignKey": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "Password": {
                    "type": Sequelize.STRING,
                    "field": "Password",
                    "required": true,
                    "allowNull": false
                },
                "Role": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Role",
                    "required": true,
                    "allowNull": false
                },
                "Active": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Active",
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
                "Name": {
                    "type": Sequelize.STRING,
                    "field": "Name",
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
                "Quantity": {
                    "type": Sequelize.INTEGER,
                    "field": "Quantity",
                    "required": true,
                    "allowNull": false
                },
                "Description": {
                    "type": Sequelize.STRING,
                    "field": "Description",
                    "required": true,
                    "allowNull": false
                },
                "Availability": {
                    "type": Sequelize.STRING,
                    "field": "Availability",
                    "required": true,
                    "allowNull": false
                },
                "Requirements": {
                    "type": Sequelize.STRING,
                    "field": "Requirements",
                    "required": true,
                    "allowNull": false
                },
                "Category": {
                    "type": Sequelize.STRING,
                    "field": "Category",
                    "required": true,
                    "allowNull": false
                },
                "SubCategory": {
                    "type": Sequelize.STRING,
                    "field": "SubCategory",
                    "required": true,
                    "allowNull": false
                },
                "OrgId": {
                    "type": Sequelize.INTEGER,
                    "field": "OrgId",
                    "foreignKey": true
                },
                "Deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Deleted",
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
                "Description": {
                    "type": Sequelize.STRING,
                    "field": "Description",
                    "required": true,
                    "allowNull": false
                },
                "Category": {
                    "type": Sequelize.STRING,
                    "field": "Category",
                    "required": true,
                    "allowNull": false
                },
                "SubCategory": {
                    "type": Sequelize.STRING,
                    "field": "SubCategory",
                    "required": true,
                    "allowNull": false
                },
                "Deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Deleted",
                    "default": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
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
                "CatId": {
                    "type": Sequelize.INTEGER,
                    "field": "CatId",
                    "foreignKey": true
                },
                "Name": {
                    "type": Sequelize.STRING,
                    "field": "Name",
                    "required": true,
                    "allowNull": false
                },
                "Type": {
                    "type": Sequelize.STRING,
                    "field": "Type",
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
                "orgName": {
                    "type": Sequelize.STRING,
                    "field": "orgName",
                    "required": false
                },
                "contactName": {
                    "type": Sequelize.STRING,
                    "field": "contactName",
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
                    "type": Sequelize.INTEGER,
                    "field": "phone",
                    "required": false
                },
                "mobilePhone": {
                    "type": Sequelize.INTEGER,
                    "field": "mobilePhone",
                    "required": false
                },
                "fax": {
                    "type": Sequelize.INTEGER,
                    "field": "fax",
                    "required": false
                },
                "contactMethod": {
                    "type": Sequelize.STRING,
                    "field": "contactMethod",
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
