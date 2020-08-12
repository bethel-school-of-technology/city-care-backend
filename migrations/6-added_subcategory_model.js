'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "subcategories", deps: []
 *
 **/

var info = {
    "revision": 6,
    "name": "added_subcategory_model",
    "created": "2020-08-12T20:48:02.538Z",
    "comment": ""
};

var migrationCommands = [{
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
