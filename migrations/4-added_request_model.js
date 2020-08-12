'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "requests", deps: []
 *
 **/

var info = {
    "revision": 4,
    "name": "added_request_model",
    "created": "2020-08-12T20:38:45.470Z",
    "comment": ""
};

var migrationCommands = [{
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
