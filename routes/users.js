var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');


//Create a user
router.post('/register', function(req, res, next) {
          models.authorization.findOrCreate({
                    where: {Email: req.body.Email },
                    defaults: {
                              Password: authService.hashPassword(req.body.Password),
                              Role: false,
                              Active: false
                    }
          }).spread(function(result, created) {
                    if(created) {
                              res.status(201).json({ message: 'Account created! Please log in and update your information!' })
                    } else {
                              res.status(400).json({ message: 'This email already exists!' })
                    }
          });
});
//Log a user in
router.post('/login', function(req, res, next) {
          models.authorization.findOne({
                    where: { Email: req.body.Email }
          }).then(user => {
                    if(!user) {
                              console.log('User not found!');
                              return res.status(400).json({ message: 'Login failed! User not found!'});
                    } else {
                              let passwordMatch = authService.comparePasswords(req.body.Password, user.Password);
                              if(passwordMatch) {
                                        let token = authService.signUser(user);
                                        res.cookie('jwt', token);
                                        res.status(201).json({token: token, message: 'You have been logged in!'})
                              } else {
                                        res.status(400).json({ message: 'Wrong password!'})
                              }
                    }
          });
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
