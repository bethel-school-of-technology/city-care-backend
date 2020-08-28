var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');


//Create an org user
router.post('/create', function(req, res, next) {
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {

                    })
          }

});

/* GET all org listings. */
router.get('/listings', function (req, res, next) {
      
       });
/*Update an org listing */
router.put('/:id', function(req, res, next) {
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              
                    })
          }
});
/*Delete an org listing */
router.delete('/:id', function(req, res, next) {
          let token = req.headers['jwt'];
          if(token) {
                    authService.verifyUser(token).then(user => {
                              
                    })
          }
});

module.exports = router;
