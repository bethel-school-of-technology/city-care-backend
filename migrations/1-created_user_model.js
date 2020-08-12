'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "created_user_model",
    "created": "2020-08-12T20:20:29.182Z",
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
            "Email": {
                "type": Sequelize.STRING,
                "field": "Email",
                "required": true,
                "allowNull": false
            },
            "Phone": {
                "type": Sequelize.INTEGER,
                "field": "Phone"
            },
            "MobilePhone": {
                "type": Sequelize.INTEGER,
                "field": "MobilePhone"
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
                "field": "Address2",
                "required": true,
                "allowNull": false
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
}];

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
