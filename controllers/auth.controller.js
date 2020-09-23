// var express = require('express');
var models = require('../models');
var authService = require('../services/auth.service');

exports.user_registration =  function(req, res, next) {
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
                admin: false,
              }
            })
            .spread(function (created, error) {
              if (created) {
                res.status(201).json({created, message: 'User created & registered! Welcome to City Care!'});
              } else
                res.status(500).json(error)
            });
        }

exports.email_login =  (req, res, next) => {
          let fetchedUser;
          models.users
            .findOne({
              where: {
                email: req.body.email
              }
            })
            .then((user, error) => {
              if (!user) {
                return res.status(404).json(error);
              } else {
                fetchedUser = user;
                let passwordMatch = authService.comparePasswords(
                  req.body.password,
                  user.password
                );
                if (passwordMatch) {
                  let token = authService.signUser(user);
                  res.status(202).json({
                    token: token,
                    message: 'You have been logged in!',
                    expiresIn: 3600,
                    userId: fetchedUser.id,
                    isOrg: fetchedUser.isOrg,
                    isAdmin: fetchedUser.admin
                  });
                } else {
                  res.status(401).json(error);
                } 
              }
            });
        }

exports.user_name_login = function(req, res, next) {
          let fetchedUser;
          models.users
            .findOne({
              where: {
                username: req.body.username
              }
            })
            .then((user, error) => {
              if (!user) {
                return res.status(404).json(error);
              } else {
                fetchedUser = user;
                let passwordMatch = authService.comparePasswords(
                  req.body.password,
                  user.password
                );
                if (passwordMatch) {
                  let token = authService.signUser(user);
                  res.status(202).json({
                    token: token,
                    message: 'You have been logged in!',
                    expiresIn: 3600,
                    userId: fetchedUser.id,
                    isOrg: fetchedUser.isOrg,
                    isAdmin: fetchedUser.admin
                  });
                } else {
                  res.status(401).json(error);
                }
              }
            });
        }