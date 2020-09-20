var express = require('express');
var router = express.Router();
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
          .spread(function (created, error) {
            if (created) {
              res.status(200).json(created);
            } else {
              res.status(400).json(error);
            }
          });
      } else {
        res.status(500).json(error);
      }
    });
  }
});
//Get all of the requests made by an individual for the profile page
router.get('/requests/profile', function (req, res, next) {
  let token = req.headers['jwt'];
  if (token) {
    authService.verifyUser(token).then(user => {
      let user_id = parseInt(req.params.id);
      if (user) {
        models.requests.findAll({
          where: { user_id: user.id, deleted: false }
        }).then((requests, error) => {
          res.status(200).json(requests);
        })
      } else {
        res.status(400).json(error)
      }
    });
  } else {
    res.status(500).json(error)
  }
});
//Get all of the users that are not organizations and their requests based on the logged in users zip code
router.get('/findUsers', function (req, res, next) {
  let token = req.headers['jwt'];
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        models.users.findAll({
          where: { isOrg: false, zip: user.zip,  deleted: false },
          include: { model: models.requests, where: { deleted: false } }
        }).then((requests_data, error) => {
          res.status(200).json({ requests: requests_data })
        })
      } else {
        res.status(400).json(error)
      }
    })
  } else {
    res.status(500).json(error)
  }
});

//Get a single request made by the individual
router.get('/:id', function (req, res, next) {
  let token = req.headers['jwt'];
  let userId = req.params.id;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        models.requests.findByPk(req.params.id, {
          include: [{
            model: models.users
          }]
        })
          .then((request, error) => {
            console.log(request);
            res.status(200).json(request);
          })
      } else {
        res.status(401).json(error)
      }
    })
  } else {
    res.status(500).json(error);
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
          .then(function (result, error) {
            if (result) {
              res.status(201).json(result);
            }
          });
      } else {
        res.status(400).json(error);
      }
    });
  } else {
    res.status(500).json(error);
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
          .then(function (result, error) {
            if (result) {
              console.log(result);
              res.status(200).json(error);
            } else {
              res.status(400).json(error);
            }
          });
      } else {
        res.status(500).json(error);
      }
    });
  }
});
module.exports = router;
