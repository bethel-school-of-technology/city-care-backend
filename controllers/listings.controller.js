// var express = require('express');
// var router = express.Router();
var models = require('../models');
var authService = require('../services/auth.service');

//Create a listing
exports.create_listing = function (req, res, next) {
          let token = req.headers['jwt'];
          if (token) {
             authService.verifyUser(token).then(user => {
                if (user) {
                   models.listings.findOrCreate({
                      where: { description: req.body.description },
                      defaults: {
                         quantity: req.body.quantity,
                         availability: req.body.availability,
                         requirements: req.body.requirements,
                         description: req.body.description,
                         org_id: user.id,
                         deleted: false,
                      }
                   }).spread(function (created, error) {
                      if (created) {
                         res.status(201).json({created, message: 'Listing Created.'});
                      } else {
                         res.status(400).json(error)
                      }
                   })
                } else {
                   res.status(500).json(error)
                }
             });
          }
       }
//Get all listings made by an organization
exports.get_listings = function (req, res, next) {
          let token = req.headers['jwt'];
          if (token) {
             authService.verifyUser(token).then(user => {
                let org_id = parseInt(req.params.id);
                if (user) {
                   models.listings.findAll({
                      where: { org_id: user.id, deleted: false }
                   }).then((listings, error) => {
                      console.log(listings);
                      res.status(200).json(listings);
                   })
                } else {
                   res.status(400).json(error)
                }
             });
          } else {
             res.status(500).json(error)
          }
       }
//Get an organization listing by the id
exports.get_one_listing = function (req, res, next) {
          let token = req.headers['jwt'];
          let listingId = req.params.id;
          if (token) {
             authService.verifyUser(token).then(user => {
                if (user) {
                   models.listings.findByPk(req.params.id, {
                      include: [{
                         model: models.users
                      }]
                   })
                      .then((listing, error) => {
                         res.status(200).json(listing);
                      })
                } else {
                   res.status(401).json(error)
                }
             })
          } else {
             res.status(500).json(error);
          }
       }
//Get all of the listings and organizations that made them
exports.get_listings_with_users = function (req, res, next) {
          let token = req.headers['jwt'];
          if (token) {
             authService.verifyUser(token).then(user => {
                if (user) {
                   models.users.findAll({
                      where: { isOrg: true, zip: user.zip, deleted: false },
                      include: { model: models.listings, where: { deleted: false } }
                   }).then((listings_data, error) => {
                      res.status(200).json({ listings: listings_data })
                   })
                } else {
                   res.status(400).json(error)
                }
             })
          } else {
             res.status(500).json(error)
          }
       }
//Update an organization listing
exports.update_listing = function (req, res, next) {
          let token = req.headers['jwt'];
          let listingId = parseInt(req.params.id);
          if (token) {
             authService.verifyUser(token).then((user) => {
                if (user) {
                   models.listings
                      .update(
                         {
                            quantity: req.body.quantity,
                            availability: req.body.availability,
                            requirements: req.body.requirements,
                            description: req.body.description,
                            org_id: user.id,
                            deleted: false
                         },
                         {
                            where: {
                               id: listingId
                            }
                         }
                      )
                      .then(function (result, error) {
                         if (result) {
                            res.status(202).json({result, message: 'Listing updated.'});
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
//Delete an organization listing
exports.delete_listing = function (req, res, next) {
          let listingId = parseInt(req.params.id);
          let token = req.headers['jwt'];
          if (token) {
             authService.verifyUser(token).then(user => {
                if (user) {
                   models.listings.update({
                      deleted: true
                   }, {
                      where: { id: listingId }
                   }).then(function (result, error) {
                      if (result) {
                         res.status(202).json({result, message: 'Listing deleted.'})
                      } else {
                         res.status(400).json(error)
                      }
                   })
                } else {
                   res.status(500).json(error)
                }
             })
          }
       }