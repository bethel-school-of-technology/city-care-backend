var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');

router.get('/create', function(req, res, next) {
          res.status(200).json({message: 'Fetch successful!'})
});
router.post('/create', function(req, res, next) {
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {
                                        models.requests.findOrCreate({
                                                  where: {
                                                            description: req.body.description
                                                  },
                                                  defaults: {
                                                            category: req.body.category,
                                                            sub_category: req.body.sub_category,
                                                            deleted: false,
                                                            user_id: user.id
                                                  }
                                        }).spread(function(result, created) {
                                                  if(created) {
                                                            res.status(201).json({ message: 'Request made.'})
                                                  } else {
                                                            res.status(400).json({ message: 'You are not logged in.'})
                                                  }
                                        })
                              } else {
                                        res.status(500).json({ message: 'Internal server error!'})
                              }
                    })
          }
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
