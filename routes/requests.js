var express = require('express');
var router = express.Router();
var cors = require('cors');
var mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');


//Create a user request and store it in the database
router.post('/create', function (req, res, next) {
  let token = req.headers['jwt'];
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.requests
          .findOrCreate({
            where: { name: req.body.name },
            defaults: {
              details: req.body.details,
              needByDate: req.body.needByDate,
              deleted: false,
              user_id: user.id
            }
          })
          .spread(function (result, created) {
            if (created) {
              res.status(200).json(created);
            } else {
              res.status(400).json({
                message: 'Not today Satan!'
              });
            }
          });
      } else {
        res.status(500).json({ message: 'Internal server error!' });
      }
    });
  }
});
//Get all of the requests made by an individual for the profile page
router.get('/requests/profile', function (req, res, next) {
  let token = req.headers['jwt'];
  if(token) {
            authService.verifyUser(token).then(user => {
              let user_id = parseInt(req.params.id);
                      if(user) {
                                models.requests.findAll({
                                          where: { user_id: user.id, deleted: false }
                                }).then(requests =>{
                                          res.status(200).json(requests);
                                })
                      } else { 
                                res.status(400).json({ message: 'Not Today Satan!'})
                      }
            });
  } else { 
    res.status(500).json({ message: 'Internal server error!'})
  }
});
//Get all of the users that are not organizations 
router.get('/findUsers', function(req, res, next) {
  let token = req.headers['jwt'];
  if(token) {
     authService.verifyUser(token).then(user => {
    if(user) {
       models.users.findAll({
          where: { isOrg: false, isOrg: null, deleted: false },
          include: { model: models.requests },
       }).then(requests_data => {
          res.status(200).json( {requests: requests_data, users: user })
       })
    } else {
     res.status(400).json({ message: 'Not today Satan!'})
    }
     })
  } else {
    res.status(500).json({ message: 'Internal server error!'})
  }
});

//Get a single request made by the individual
router.get('/:id', function (req, res, next) {
  let token = req.headers['jwt'];
  let user_id = req.params.id;
  if (token) {
     authService.verifyUser(token).then(user => {
        if (user) {
           models.requests.findByPk(req.params.id)
              .then(request => {
                 console.log(request);
                 res.status(200).json(request);
              })
        } else {
           res.status(401).json({
              message: 'Not today satan!'
           })
        } 
     })
  } else {
     res.status(500).json({
        message: 'Internal server error!'
     });
  }
});
//update a request 
router.put('/update/:id', function (req, res, next) {
  let token = req.headers['jwt'];
  let requestId = parseInt(req.params.id);
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.requests
          .update(
            {
              name: req.body.name,
              details: req.body.details,
              needByDate: req.body.needByDate,
              user_id: user.id,
              deleted: false
            },
            {
              where: {
                id: requestId
              }
            }
          )
          .then(function (result) {
            if (result) {
              res.status(201).json(result);
            }
          });
      } else {
        res.status(400).json({
          message: 'Not today Satan!'
        });
      }
    });
  } else {
    res.status(500).json({
      message: 'Internal server error!'
    });
  }
});
//Delete an existing request
router.delete('/delete/:id', function (req, res, next) {
  let token = req.headers['jwt'];
  let requestId = parseInt(req.params.id);
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.requests
          .update(
            {
              deleted: true
            },
            {
              where: { id: requestId }
            }
          )
          .then(function (result) {
            if (result) {
              console.log(result);
              res.status(200).json({ message: 'Listing marked for deletion!' });
            } else {
              res.status(400).json({
                message: 'Not today Satan!'
              });
            }
          });
      } else {
        res.status(500).json({ message: 'Internal server error!' });
      }
    });
  }
});
module.exports = router;
