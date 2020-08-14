var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');


//Create a user
router.post('/create', function(req, res, next) {

});
//Log a user in
router.post('/login', function(req, res, next) {

});
/* GET all users listing. */
router.get('/', function(req, res, next) {

});
//Get a user by the id
router.get('/:id', function(req, res, next) {

});
//Update a user
router.put('/:id', function(req, res, next) {

});
//Delete a user
router.delete('/:id', function(req, res, next) {

});
module.exports = router;
