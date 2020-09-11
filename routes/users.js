var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var cors = require('cors');
var models = require('../models');
var authService = require('../services/auth');


router.post('/', function (req, res, next) {
  models.users
    .findOrCreate({
      where: { email: req.body.email },
      defaults: {
        isOrg: req.body.isOrg,
        org_name: req.body.org_name,
        contact_name: req.body.contact_name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        mobile_phone: req.body.mobile_phone,
        fax: req.body.fax,
        contact_method: req.body.contact_method,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        county: req.body.county,
        zip: req.body.zip,
        username: req.body.username,
        password: authService.hashPassword(req.body.password),
        deleted: false,
        admin: false
      }
    })
    .spread(function (created, error) {
      if (created) {
        res.status(201).json(created);
      } else
        res.status(404).json(error);
    });
});

//Log a user in with email
router.post('/emailLogin', function (req, res, next) {
  let fetchedUser;
  models.users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user, error) => {
      if (!user) {
        return res.status(400).json(error);
      } else {
        fetchedUser = user;
        let passwordMatch = authService.comparePasswords(
          req.body.password,
          user.password
        );
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.status(201).json({
            token: token,
            message: 'You have been logged in!',
            expiresIn: 3600,
            userId: fetchedUser.id,
            isOrg: fetchedUser.isOrg,
            isAdmin: fetchedUser.admin
          });
        } else {
          res.status(400).json(error);
        }
      }
    });
});

//Log a user in with username
router.post('/usernameLogin', function (req, res, next) {
  let fetchedUser;
  models.users
    .findOne({
      where: {
        username: req.body.username
      }
    })
    .then((user, error) => {
      if (!user) {
        return res.status(400).json(error);
      } else {
        fetchedUser = user;
        let passwordMatch = authService.comparePasswords(
          req.body.password,
          user.password
        );
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.status(201).json({
            token: token,
            message: 'You have been logged in!',
            expiresIn: 3600,
            userId: fetchedUser.id,
            isOrg: fetchedUser.isOrg,
            isAdmin: fetchedUser.admin
          });
        } else {
          res.status(400).json(error);
        } 
      }
    });
});

/*Get user/org profile using authentication token */
router.get('/profile', function (req, res, next) {
  let token = req.headers['jwt'];
  if (token) {
    authService.verifyUser(token).then((user, error) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).json(error);
      }
    });
  } else {
    res.status(500).json(error);
  }
});

//Get a user by the id for the update user page form and the view listing or request page
router.get('/:id', function (req, res, next) {
  // let userId = req.params.id;
  let token = req.headers['jwt'];
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.users.findByPk(parseInt(req.params.id)).then((user, error) => {
          res.status(200).json(user);
        });
      } else {
        res.status(400).json(error);
      }
    });
  } else {
    res.status(500).json(error);
  }
});


//Update a users information in the database
router.put('/:id', function (req, res, next) {
  let token = req.headers['jwt'];
  let userId = parseInt(req.params.id);
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.users
          .update(
            {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              org_name: req.body.org_name,
              contact_name: req.body.contact_name,
              username: req.body.username,
              email: req.body.email,
              phone: req.body.phone,
              mobile_phone: req.body.mobile_phone,
              fax: req.body.fax,
              contact_method: req.body.contact_method,
              address1: req.body.address1,
              address2: req.body.address2,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip,
              county: req.body.county
            },
            {
              where: {
                id: userId
              }
            }
          )
          .then(function(result, error) {
            if (result) {
              res.status(200).json(result);
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

module.exports = router;
