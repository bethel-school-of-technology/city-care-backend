var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var cors = require('cors');
var models = require('../models');
var authService = require('../services/auth');

router.post('/', function(req, res, next) {
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {

                              }
                    })
          }
});
router.get('/', function(req, res, next) {
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {
                                        
                              }
                    })
          }
});
router.get('/:id', function(req, res, next) {
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {
                                        
                              }
                    })
          }
});
router.put('/:id', function(req, res, next) {
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {
                                        
                              }
                    })
          }
});
router.delete('/:id', function(req, res, next) {
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {
                                        
                              }
                    })
          }
});

module.exports = router;
