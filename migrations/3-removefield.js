'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "hasPosts" from table "users"
 *
 **/

var info = {
    "revision": 3,
    "name": "removefield",
    "created": "2020-09-11T20:10:30.900Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["users", "hasPosts"]
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
