var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var cors = require('cors');
var models = require('../models');
var authService = require('../services/auth');

//Create a user
// router.post('/register', function (req, res, next) {
//   models.users
//     .findOrCreate({
//       where: {
//         email: req.body.email
//       },
//       defaults: {
//         type: req.body.type,
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         phone: req.body.phone,
//         mobile_phone: req.body.mobile_phone,
//         contact_method: req.body.contact_method,
//         address1: req.body.address1,
//         address2: req.body.address2,
//         city: req.body.city,
//         state: req.body.state,
//         zip: req.body.zip,
//         password: authService.hashPassword(req.body.password)
//       }
//     })
//     .spread(function (result, created) {
//       if (created) {
//         res.status(201).redirect('/city-care/profile');
//       } else {
//         res.status(400).send('This user already exists!');
//       }
//     });
// });



/* router.post('/register', function(req, res, next) {
  models.users.findOrCreate({
    where: { email: req.body.email},
    defaults: {
      isOrg: req.body.isOrg,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      org_name: req.body.org_name,
      contact_name: req.body.contact_name,
      username: req.body.username,
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
      password: authService.hashPassword(req.body.password),
      isOrg: true,
      deleted: false,
      admin: true,
      active: false
    }
  }).spread(function(result, created) {
    if(created) {
      console.log(result);
      res.status(200).json(result);
    } else {
      res.status(400).json({message: 'Not going to happen sunshine!'})
    } 
  })
}); */
//Log a user in
router.post('/login', function (req, res, next) {
  models.users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if (!user) {
        console.log('User not found!');
        return res.status(400).json({
          message: 'Login Failed! User not found!'
        });
      } else {
        let passwordMatch = authService.comparePasswords(
          req.body.password,
          user.password
        );
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.status(200).json({
            token: token,
            message: 'You have been logged in!'
          });
        } else {
          res.status(400).json({
            message: 'Wrong Password!'
          });
        }
      }
    });
});

/*Get user/org profile using authentication token */
router.get('/profile', function (req, res, next) {
  let token = req.headers['jwt'];
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).json({
          message: 'There has been an error, user must be logged in.'
        });
      }
    });
  } else {
    res.status(500).json({
      message: 'internal server mix up'
    });
  }
});

/* GET all users listing for the admin user. */
/* router.get('/', function (req, res, next) {
  let token = req.headers['jwt'];
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.users.findAll({}).then((users) => {
          console.log(users);
          res.status(201).json(users);
        });
      } else {
        res.status(400).json({
          message: 'You are not authorized to view this page!'
        });
      }
    });
  } else {
    res.status(400).json({
      message: 'You are not logged in!'
    });
  }
}); */
//Get a user by the id
router.get('/:id', function (req, res, next) {
  let userId = req.params.id;
  let token = req.headers['jwt'];
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user && user.admin) {
        models.users.findByPk(parseInt(req.params.id)).then((user) => {
          res.status(200).json(user);
        });
      } else {
        res.status(400).json({
          message: 'You can not do that!'
        });
      }
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error!'
    });
  }
});
//Update a user
router.put('/:id', function(req, res, next) {
  let token = req.headers['jwt'];
  let userId = parseInt(req.params.id);
  if(token) {
    authService.verifyUser(token).then(user => {
      if(user) {
        models.users.update({
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
        }, {
          where: {
            id: userId
          }}).then(function(result) {
          if(result) {
            res.status(201).json(result)
          }
        })
      } else {
        res.status(400).json({message: 'Unable to update this user!'})
      }
    })
  } else {
    res.status(500).json({message: 'Internal server error!'})
  }
});


//Delete a user for the admin
/* router.delete('/:id', function (req, res, next) {
  let UserId = parseInt(req.params.id);
  let token = req.headers['jwt'];
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user && user.Admin) {
        models.users
          .delete({
            where: {
              UserId: UserId
            }
          })
          .then(function (result) {
            if (result) {
              res.status(201).json({
                message: 'This user has be removed!'
              });
            }
          });
      } else {
        res.status(400).json({
          message: 'User can not be deleted!'
        });
      }
    });
  } else {
    res.status(500).json({
      message: 'Whoops, something went wrong!'
    });
  }
}); */

module.exports = router;
