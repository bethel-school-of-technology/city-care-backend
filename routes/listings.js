var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');


//Create an org user
router.post('/create', function(req, res, next) {

});
//Log an org user in
router.post('/login', function(req, res, next) {

});
/* GET all orgs listing. */
router.get('/', function(req, res, next) {

});
/*Get an org by the id */
router.get('/:id', function(req, res, next) {

});
/*Update an org */
router.put('/:id', function(req, res, next) {

});
/*Delete an org */
router.delete('/:id', function(req, res, next) {

});

module.exports = router;
