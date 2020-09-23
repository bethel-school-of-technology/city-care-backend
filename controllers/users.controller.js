// const express = require('express');
const models = require('../models');
const authService = require('../services/auth.service');


//Get a user by the users token for the profile page
exports.get_profile =  function(req, res, next) {
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
        }

//Get a user for the  update user form
exports.get_user = function(req, res, next) {
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
        }
        
exports.update_user = function(req, res, next) {
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
                  .then(function (result, error) {
                    if (result) {
                      res.status(202).json({result, message: 'User updated.'});
                    }
                  });
              } else {
                res.status(400).json(error);
              }
            });
          } else {
            res.status(500).json(error);
          }
        }