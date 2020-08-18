var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var cors = require('cors');
var models = require('../models');
var authService = require('../services/auth');


//Create a user
router.post('/register', function(req, res, next) {
          models.users.findOrCreate({
                
          }).spread(function(result, created) {
                    console.log(user.Password)
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
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {
                                        models.users.findAll({}).then(users => {
                                                  console.log(users);
                                                  res.status(201).json(users);
                                        });
                              } else {
                                        res.status(400).json({ message: 'You are not authorized to view this page!'})
                              }
                    });
          } else {
                    res.status(400).json({ message: 'You are not logged in!'})
          }
});
//Get a user by the id
router.get('/:id', function(req, res, next) {
      
});
//Update a user
router.put('/:id', function(req, res, next) {
          let token = req.headers['jwt'];
          let UserId =  parseInt(req.params.id);
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {
                                        models.users.update({
                                                  FirstName: req.body.FirstName,
                                                  LastName: req.body.FirstName,
                                                  Email: req.body.Email,
                                                  Phone: req.body.Phone,
                                                  MobilePhone: req.body.MobilePhone,
                                                  ContactMethod: req.body.ContactMethod,
                                                  Address1: req.body.Address1,
                                                  Address2: req.body.Address2,
                                                  City: req.body.City,
                                                  State: req.body.State,
                                                  County: req.body.County,
                                                  Zip: req.body.Zip
                                        }, {where: {
                                                  UserId: UserId
                                        }}).then(function(result) {
                                                  if(result) {
                                                            res.status(201).json(result);
                                                  }
                                        });
                              } else {
                                        res.status(400).json({ message: 'Unable to update this user!'})
                              }
                    });
          } else {
                    res.status(500).json({ message: 'Whoops, something went wrong!'})
          }
});
//Delete a user
router.delete('/:id', function(req, res, next) {
          let UserId = parseInt(req.params.id);
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user && user.Admin) {
                                        models.users.delete({
                                                  where: { UserId: UserId}
                                        }).then(function(result) {
                                                  if(result) {
                                                            res.status(201).json({ message: 'This user has be removed!'});
                                                  }
                                        });
                              } else {
                                        res.status(400).json({ message: 'User can not be deleted!'})
                              }
                    });
          } else {
                    res.status(500).json({ message: 'Whoops, something went wrong!'})
          }
});
module.exports = router;
