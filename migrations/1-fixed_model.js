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
    "name": "fixed_model",
    "created": "2020-08-15T11:11:53.170Z",
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
                "FirstName": {
                    "type": Sequelize.STRING,
                    "field": "FirstName",
                    "required": true,
                    "allowNull": false
                },
                "LastName": {
                    "type": Sequelize.STRING,
                    "field": "LastName",
                    "required": true,
                    "allowNull": false
                },
                "OrgName": {
                    "type": Sequelize.STRING,
                    "field": "OrgName",
                    "allowNull": false
                },
                "ContactName": {
                    "type": Sequelize.STRING,
                    "field": "ContactName",
                    "required": false
                },
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "required": true,
                    "allowNull": false
                },
                "Phone": {
                    "type": Sequelize.STRING,
                    "field": "Phone"
                },
                "MobilePhone": {
                    "type": Sequelize.STRING,
                    "field": "MobilePhone"
                },
                "Fax": {
                    "type": Sequelize.STRING,
                    "field": "Fax",
                    "required": false
                },
                "ContactMethod": {
                    "type": Sequelize.STRING,
                    "field": "ContactMethod",
                    "required": true,
                    "allowNull": false
                },
                "Address1": {
                    "type": Sequelize.STRING,
                    "field": "Address1",
                    "required": true,
                    "allowNull": false
                },
                "Address2": {
                    "type": Sequelize.STRING,
                    "field": "Address2"
                },
                "City": {
                    "type": Sequelize.STRING,
                    "field": "City",
                    "required": true,
                    "allowNull": false
                },
                "State": {
                    "type": Sequelize.STRING,
                    "field": "State",
                    "required": true,
                    "allowNull": false
                },
                "County": {
                    "type": Sequelize.STRING,
                    "field": "County",
                    "required": true,
                    "allowNull": false
                },
                "Zip": {
                    "type": Sequelize.INTEGER,
                    "field": "Zip",
                    "required": true,
                    "allowNull": false
                },
                "Password": {
                    "type": Sequelize.STRING,
                    "field": "Password"
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
