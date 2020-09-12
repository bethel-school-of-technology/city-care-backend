var express = require('express');
var router = express.Router();
var cors = require('cors');
var mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');


//Create an org listing
router.post('/create', function (req, res, next) {
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
            }).spread(function(created, error) {
                     if(created) {
                     res.status(200).json(created);
                } else {
                   res.status(400).json(error)
                }
            })
         } else {
            res.status(500).json(error)
         }
      });
   }
});

//update a listing 
router.put('/update/:id', function (req, res, next) {
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
               res.status(200).json(result);
             }
           });
       } else {
         res.status(400).json(error);
       }
     });
   } else {
     res.status(500).json(error);
   }
 });

//Get all of an organization listings to display on the profile page
router.get('/listings', function (req, res, next) {
   let token = req.headers['jwt'];
   if(token) {
             authService.verifyUser(token).then(user => {
               let org_id = parseInt(req.params.id);
                       if(user) {
                                 models.listings.findAll({
                                           where: { org_id: user.id, deleted: false }
                                 }).then((listings, error) =>{
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
});


/*Get an org listing by the id to display on the view listing page*/
router.get('/listing/:id', function (req, res, next) {
   let token = req.headers['jwt'];
   let userId = req.params.id;
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
});

//Get an organization listings with the organization information that made the listing
router.get('/findOrgs', function(req, res, next) {
   let token = req.headers['jwt'];
   if(token) {
      authService.verifyUser(token).then(user => {
     if(user) {
        models.users.findAll({
           where: { isOrg: true, deleted: false },
           include: { model: models.listings  }
        }).then((listings_data, error) => {
           res.status(200).json( {listings: listings_data })
        })
     } else {
      res.status(400).json(error)
     }
      })
   } else {
      res.status(500).json(error)
   }
});
/*Delete an org listing*/
router.delete('/delete/:id', function(req, res, next) {
   let listingId = parseInt(req.params.id);
   let token = req.headers['jwt'];
   if(token) {
      authService.verifyUser(token).then(user => {
         if(user) {
            models.listings.update({
               deleted: true
            }, {
               where: { id: listingId }
            }).then(function(result, error) {
               if(result) {
                  res.status(200).json(result)
               } else {
                  res.status(400).json(error)
               }
            })
         } else {
            res.status(500).json(error)
         }
      })
   }
});

module.exports = router;