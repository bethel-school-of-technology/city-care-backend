var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');


//Create an org user
router.post('/register', function (req, res, next) {

});
//Log an org user in
router.post('/login', function (req, res, next) {
    models.authorization.findOne({
        where: {
            Email: req.body.Email
        }
    }).then(user => {
        if (!user) {
            console.log('User not found!');
            return res.status(400).json({
                message: 'Login failed! User not found!'
            });
        } else {
            let passwordMatch = authService.comparePasswords(req.body.Password, user.Password);
            if (passwordMatch) {
                let token = authService.signUser(user);
                res.cookie('jwt', token);
                res.status(201).json({
                    token: token,
                    message: 'You have been logged in!'
                })
            } else {
                res.status(400).json({
                    message: 'Wrong password!'
                })
            }
        }
    });
});
// /* GET  orgs profile. */
// router.get('/profile', function(req, res, next) {
//           let token = req.headers['jwt'];
//           if(token) {
//                     authService.verifyUser(token).then(org => {
//                               if(org) {
//                                         res.status(200).json(org);
//                               } else {
//                                         res.status(401).json({ message: 'There has been an error, you must log in.'})
//                               }
//                     })
//           } else {
//                     res.status(500).json({ messgae: 'Internal server error!'})
//           }
// });
/*Get an org by the id */
router.get('/:id', function (req, res, next) {
    let token = req.headers['jwt'];
    if (token) {
        authService.verifyUser(token).then(org => {
            if (org) {

            }
        })
    }

});
/*Update an org */
router.put('/:id', function (req, res, next) {
    let token = req.headers['jwt'];
    let orgId = parseInt(req.params.id);
    if (token) {
        authService.verifyUser(token).then(org => {
            if (org) {
                models.organizations.update({
                    OrgName: req.body.OrgName,
                    ContactName: req.body.ContactName,
                    Email: req.body.Email,
                    Phone: req.body.Phone,
                    Fax: req.body.Fax,
                    Address1: req.body.Address1,
                    Address2: req.body.Address2,
                    City: req.body.City,
                    State: req.body.State,
                    County: req.body.County,
                    Zip: req.body.Zip
                }, {
                    where: {
                        orgId: orgId
                    }
                }).then(function (result) {
                    if (result) {
                        res.status(200).json(result);
                    }
                })
            } else {
                res.status(400).json({
                    message: 'Unable to update this organization.'
                })
            }
        })
    } else {
        res.status(500).json({
            message: 'Whoops, something went wrong!'
        })
    }
});
/*Delete an org */
router.delete('/:id', function (req, res, next) {
    let token = req.headers['jwt'];
    if (token) {
        authService.verifyUser(token).then(org => {
            let orgId = parseInt(req.params.id);
            if (org) {
                models.organizations.delete({
                    where: {
                        orgId: orgId
                    }
                }).then(function (result) {
                    if (result) {
                        res.status(200).json({
                            message: 'This organization has been removed!'
                        })
                    }
                });
            } else {
                res.status(400).json({
                    message: 'This organization can not be removed!'
                })
            }
        });
    } else {
        res.status(500).json({
            message: 'Whoops, something went wrong!'
        })
    }
});
module.exports = router;