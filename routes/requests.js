var express = require('express');
var router = express.Router();
var cors = require('cors');
var mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');

router.get('/create', function(req, res, next) {
          res.status(200).json({message: 'You fetched the create request route.'})
})
//Create a user request
router.post('/create', function(req, res, next) {
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {
                                        models.requests.findOrCreate({
                                                  where: { description: req.body.description},
                                                  defaults: {
                                                            category: req.body.category,
                                                            sub_category: req.body.sub_category,
                                                            deleted: false,
                                                            user_id: user.id
                                                  }
                                        }).spread(function(result, created) {
                                                  if(created) {
                                                            console.log(result);
                                                            res.status(200).json(result);
                                                  } else {
                                                            res.status(400).json({message: 'Sorry sunshine, not going to create that one!'})
                                                  }
                                        });
                              } else {
                                        res.status(500).json({message: 'Internal server error!'})
                              }
                    });
          }
});
// router.post('/create', function(req, res, next) {
//           let token = req.headers['jwt'];
//           if(token) {
//                     authService.verifyUser(token).then(user => {
//                              if(user) {
//                                        models.requests.findOrCreate({
//                                                  where: { description: req.body.description },
//                                                  defaults: {
//                                                            category: req.body.category,
//                                                            sub_category: req.body.sub_category,
//                                                            deleted: false,
//                                                            user_id: user.id
//                                                  }
//                                        }).spread(function(result, created) {
//                                                  if(created) {
//                                                            console.log(result);
//                                                            res.status(200).json(result);
//                                                  } else {
//                                                            res.status(400).json({message: 'Can not create request!' })
//                                                  }
//                                        });
//                              }
//                     });
//           }
// });

//Get all of the requests made by an individual 
router.get('/requests', function(req, res, next) {
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {
                                        models.requests.findAll({
                                                  where: { user_id: user.id, deleted: false }
                                        }).then(requests =>{
                                                  console.log(requests);
                                                  res.status(200).json(requests);
                                        })
                              } else { 
                                        res.status(400).json({message: 'Can not find requests.'})
                              }
                    })
          }
});
//Get a single request made by the individual 
router.get('/:id', function(req, res, next) {
          let token = req.headers['jwt'];
          let id = req.params.id;
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {
                                        models.requests.findByPk(req.params.id)
                                        .then(request => {
                                                  console.log(request);
                                                  res.status(200).json(request);
                                        })
                              } else {
                                        res.status(401).json({message: 'Could not find request!'})
                              }
                    })
          } else {
                    res.status(500).json({ message: 'Internal server error!'})
          }
});
//Update a request
router.put('/:id', function(req, res, next) {
          let token = req.headers['jwt'];
          let id = parseInt(req.params.id);
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {
                                        models.requests.update({
                                                  
                                        })
                              }
                    })
          }
});
//Delete an existing request
router.delete('/:id', function(req, res, next) {
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              if(user) {
                                        models.requests.delete({
                                                  where: { id: id, deleted: false }
                                        }).then(function(result) {
                                                  if(result) {
                                                            res.status(200).json({message: 'This request has been deleted!'})
                                                  }
                                        })
                              } else {
                                        res.status(400).json({message: 'Request can not be deleted!'})
                              }
                    });
          } else {
                    res.status(500).json({message: 'Internal Server Error!'})
          }
});
module.exports = router;
