'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "date" from table "requests"
 * addColumn "needByDate" to table "requests"
 *
 **/

var info = {
    "revision": 2,
    "name": "needby",
    "created": "2020-08-29T01:18:35.921Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["requests", "date"]
    },
    {
        fn: "addColumn",
        params: [
            "requests",
            "needByDate",
            {
                "type": Sequelize.DATE,
                "field": "needByDate",
                "required": true
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
