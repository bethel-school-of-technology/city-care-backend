var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var cors = require('cors');
var models = require('../models');
var authService = require('../services/auth');

router.post('/register', function (req, res, next) {
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
    .spread(function (result, created) {
      if (created) {
        console.log(created);
        res.status(201).json(created);
      } else
        res.status(400).json({
          message: 'Not today Satan!'
        });
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
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: 'Login Failed! User not found!'
        });
      } else {
        fetchedUser = user;
        let passwordMatch = authService.comparePasswords(
          req.body.password,
          user.password
        );
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.status(200).json({
            token: token,
            message: 'You have been logged in!',
            expiresIn: 3600,
            userId: fetchedUser.id,
            isOrg: fetchedUser.isOrg,
            isAdmin: fetchedUser.admin
          });
        } else {
          res.status(400).json({
            message: 'Not today Satan!'
          });
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
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: 'Not today Satan!'
        });
      } else {
        fetchedUser = user;
        let passwordMatch = authService.comparePasswords(
          req.body.password,
          user.password
        );
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.status(200).json({
            token: token,
            message: 'You have been logged in!',
            expiresIn: 3600,
            userId: fetchedUser.id,
            isOrg: fetchedUser.isOrg,
            isAdmin: fetchedUser.admin
          });
        } else {
          res.status(400).json({
            message: 'Not today Satan!'
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
//Get the users for the site tally page using the token
router.get('/information', function(req, res, next) {
  let token = req.headers['jst'];
if(token) {
  authService.verifyUser(token).then(user => {
    if(user) {
      models.users.findAll({
        where: { zip: user.zip, deleted: false },
        include: { model: models.listings },
        include: { model: models.requsts }
      }).then(users, listings, requests => {
        res.status(201).json(users, listings, requests);
      })
    } else {
      res.status(400).json({ message: 'Not today Satan!'})
    }
  })
} else {
  res.status(500).json({ message: 'Internal Server Error!' });
}
});


//Get a user by the id
router.get('/:id', function (req, res, next) {
  let user_id = req.params.id;
  let token = req.headers['jwt'];
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.users.findByPk(parseInt(req.params.id)).then((user) => {
          res.status(200).json(user);
        });
      } else {
        res.status(400).json({
          message: 'Not today Satan!'
        });
      }
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error!'
    });
  }
});
router.get('/userRequest/:id', function(req, res, next) {
  let user_id = req.params.id;
  let token = req.headers['jwt'];
  if(token) {
    authService.verifyUser(token).then(user => {
      if(user) {
        models.users.findByPk(parseInt(req.params.id)).then((user) => {
          res.status(200).json(user)
        })
      } else { 
        res.status(400).json({ message: 'Not today Satan'});
      }
    })
  } else {
    res.status(500).json({ message: 'Internal server error!'})
  }
});
//Update a user
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
          .then(function (result) {
            if (result) {
              res.status(201).json(result);
            }
          });
      } else {
        res.status(400).json({
          message: 'Not today satan!'
        });
      }
    });
  } else {
    res.status(500).json({
      message: 'Internal server error!'
    });
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
