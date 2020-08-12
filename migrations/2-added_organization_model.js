'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "organizations", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "added_organization_model",
    "created": "2020-08-12T20:28:00.706Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "organizations",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "primaryKey": true,
                "allowNull": false,
                "autoIncrement": true
            },
            "OrgName": {
                "type": Sequelize.STRING,
                "field": "OrgName",
                "required": true,
                "allowNull": false
            },
            "ContactName": {
                "type": Sequelize.STRING,
                "field": "ContactName",
                "required": true,
                "allowNull": false
            },
            "Phone": {
                "type": Sequelize.INTEGER,
                "field": "Phone",
                "allowNull": false,
                "required": true
            },
            "Fax": {
                "type": Sequelize.INTEGER,
                "field": "Fax"
            },
            "Email": {
                "type": Sequelize.STRING,
                "field": "Email",
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
