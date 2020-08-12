'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Authorizations", deps: []
 *
 **/

var info = {
    "revision": 7,
    "name": "added_authorization_model",
    "created": "2020-08-12T20:51:44.810Z",
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
