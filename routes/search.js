var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var cors = require('cors');
var models = require('../models');
var authService = require('../services/auth');

//Get users requests by zip code
router.get('/requests', function (req, res, next) {
          let token = req.headers['jwt'];
          if (token) {
            authService.verifyUser(token)
              .then(user => {
                if (user) { 
                  models.users
                    .findAll({
                      where: { user_id: user.id }, 
                      include: {model: models.requests}, 
                      where: {zip: user.zip }
                    })
                    .then(users_requests => {
                     res.status(200).json(users_requests);
                    })
                } else {
                  res.status(400).json({ message: 'Whoops! Something went wrong!' })
                }
              });
          } else {
                    res.status(500).json({message: 'Internal Server Error!'})
          }
        });
//Get users listings by zip code
router.get('/listings', function (req, res, next) {
          let token = req.headers['jwt'];
          if (token) {
                    authService.verifyUser(token).then(user => {
                              if (user) {
                                        models.users
                    .findAll({
                      where: { org_id: user.id }, 
                      include: {model: models.listings}, 
                      where: {zip: user.zip }
                    }).then(users_listings => {
                              res.status(200).json(users_listings);
                    })
                    } else {
                              res.status(400).json({message: 'Could not find anything that matches'});
                    }
          })
   } else {
             res.status(500).json({message: 'Internal Server Error!'})
   }
});

module.exports = router;
