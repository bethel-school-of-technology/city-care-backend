var express = require('express');
var router = express.Router();
var cors = require('cors');
var mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');


//Create an org listing
router.post('/create/listing', function(req, res, next) {
   let token = req.headers['jwt'];
   if(token) {
             authService.verifyUser(token).then(user => {
                      if(user) {

                      }
             });
   }
});
//Get all of the organization listings
router.get('/listings', function(req, res, next) {
   let token = req.headers['jwt'];
   if(token) {
             authService.verifyUser(token).then(user => {
                       if(user) {
                                 models.listings.findAll({
                                           where: { org_id: user.id, deleted: false }
                                 }).then(requests =>{
                                           console.log(requests);
                                           res.status(200).json(requests);
                                 })
                       } else { 
                                 res.status(400).json({message: 'Can not find requests.'})
                       }
             })
   }
});
/*Get an org listing by the id */
router.get('/:id', function(req, res, next) {
   let token = req.headers['jwt'];
   let org_id = req.params.id;
   if(token) {
             authService.verifyUser(token).then(user => {
                       if(user) {
                                 models.listings.findByPk(req.params.id)
                                 .then(request => {
                                           console.log(request);
                                           res.status(200).json(request);
                                 })
                       } else {
                                 res.status(401).json({message: 'Could not find request!'})
                       }
             })
   } else {
             res.status(500).json({ message: 'Internal server error!'})
   }
});
/*Update an org listing */
router.put('/:id', function(req, res, next) {

});
/*Delete an org listing*/
router.delete('/:id', function(req, res, next) {

});

module.exports = router;
