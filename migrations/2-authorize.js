'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "Authorizations"
 * createTable "authorizations", deps: [users]
 * changeColumn "email" on table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "authorize",
    "created": "2020-08-22T20:15:15.010Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "dropTable",
        params: ["Authorizations"]
    },
    {
        fn: "createTable",
        params: [
            "authorizations",
            {
                "email": {
                    "type": Sequelize.STRING,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
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
        fn: "changeColumn",
        params: [
            "users",
            "email",
            {
                "type": Sequelize.STRING,
                "field": "email",
                "required": true,
                "foreignKey": true,
                "unique": true,
                "allowNull": false
            }
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
