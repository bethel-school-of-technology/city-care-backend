'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "listings", deps: []
 *
 **/

var info = {
    "revision": 3,
    "name": "added_listing_model",
    "created": "2020-08-12T20:33:50.270Z",
    "comment": ""
};

var migrationCommands = [{
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
                "type": Sequelize.BOOLEAN,
                "field": "Availability"
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
