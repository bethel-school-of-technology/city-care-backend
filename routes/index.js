var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');



/* GET home page. */
// router.get('/users', function (req, res, next) {
//           let token = req.headers['jwt'];
//           if(token) {
//                     authService.verifyUser(token).then(user => {
//                               if(user && user.admin) {
//                                         models.users.findAll({}).then((users, error) => {
//                                                   if(users) {
//                                                             res.status(200).json(users);
//                                                   } else {
//                                                             res.status(400).json(error)
//                                                   }
//                                         });
//                               } else {
//                                         res.status(500).json(error)
//                               }
//                     });
//           }
// });
// router.get('/requests', function(req, res, next) {
//           let token = req.headers['jwt'];
//           if(token) {
//                     authService.verifyUser(token).then(user => {
//                               if(user && user.admin) {
//                                         models.listings.findAll({}).then((results, error) => {
//                                                   if(results) {
//                                                             res.status(200).json(results);
//                                                   } else {
//                                                             res.status(400).json(error)
//                                                   }
//                                         });
//                               } else {
//                                         res.status(500).json(error)
//                               }
//                     });
//           }
// });
// router.get('/listings', function(req, res, next) {
//           let token = req.headers['jwt'];
//           if(token) {
//                     authService.verifyUser(token).then(user => {
//                               if(user && user.admin) {
//                                         models.listings.findAll({}).then((results, error) => {
//                                                   if(results) {
//                                                             res.status(200).json(results);
//                                                   } else {
//                                                             res.status(400).json(error)
//                                                   }
//                                         })
//                               } else {
//                                         res.status(500).json(error);
//                               }
//                     });
//           }
// });
module.exports = router;
