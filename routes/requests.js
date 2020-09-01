var express = require('express');
var router = express.Router();
var cors = require('cors');
var mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');

router.get('/create', function (req, res, next) {
  res.status(200).json({ message: 'You fetched the create request route.' });
});

//Create a user request
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
              console.log(created);
              res.status(200).json(created);
            } else {
              res.status(400).json({
                message: 'Not today Satan'
              });
            }
          });
      } else {
        res.status(500).json({ message: 'Internal server error!' });
      }
    });
  }
});

//Get all of the requests made by an individual
router.get('/requests', function (req, res, next) {
  let token = req.headers['jwt'];
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.requests
          .findAll({
            where: { user_id: user.id, deleted: false }
          })
          .then((requests) => {
            console.log(requests);
            res.status(200).json(requests);
          });
      } else {
        res.status(400).json({ message: 'Can not find requests.' });
      }
    });
  }
});
//Get all of the requests in the same zip code as the logged in user
router.get('/all/requests', function (req, res, next) {
  let token = req.headers['jwt'];
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) { 
          models.requests
            .findAll({
              where: { deleted: false }, 
              include: {model: models.users}, 
              where: {user_id: user.id }
            })
            .then(requests => {
              console.log(requests);
             res.status(200).json(requests);

            })
        } else {
          res.status(400).json({ message: 'Whoops! Something went wrong!' })
        }
      });
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.users
          .findAll({
            where: { id: user.id },
            include: { model: models.requests },
            where: { zip: user.zip }
          })
          .then((zip_listings) => {
            res.status(200).json(zip_listings);
          });
      } else {
        res.status(400).json({ message: 'Whoops! Something went wrong!' });
      }
    });
  } else {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});
//Get a single request made by the individual
router.get('/:id', function (req, res, next) {
  let token = req.headers['jwt'];
  let id = req.params.id;
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.requests.findByPk(req.params.id).then((request) => {
          console.log(request);
          res.status(200).json(request);
        });
      } else {
        res.status(401).json({ message: 'Could not find request!' });
      }
    });
  } else {
    res.status(500).json({ message: 'Internal server error!' });
  }
});
//Update a request
router.put('/:id', function (req, res, next) {
  let token = req.headers['jwt'];
  let id = parseInt(req.params.id);
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.requests.update({});
      }
    });
  }
});
//Delete an existing request
router.delete('/:id', function (req, res, next) {
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
                message: 'You are not authorized to delete this listing!'
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
