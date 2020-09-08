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
                  deleted: false
               }
            }).spread(function(result, created) {
               if(created) {
                  console.log(created) 
                     res.status(200).json(created);
                } else {
                   res.status(400).json({ message: 'Not today satan!'})
                }
            })
         } else {
            res.status(500).json({ message: 'Internal server error!'})
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
           .then(function (result) {
             if (result) {
               res.status(201).json(result);
             }
           });
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

//Get all of an organization listings to display on the profile page
router.get('/listings', function (req, res, next) {
   let token = req.headers['jwt'];
   if(token) {
             authService.verifyUser(token).then(user => {
               let org_id = parseInt(req.params.id);
                       if(user) {
                                 models.listings.findAll({
                                           where: { org_id: user.id, deleted: false }
                                 }).then(listings =>{
                                           console.log(listings);
                                           res.status(200).json(listings);
                                 })
                       } else { 
                                 res.status(400).json({ message: 'Not today Satan!'})
                       }
             });
   } else {
      res.status(500).json({ message: 'Internal server error!'})
   }
});


/*Get an org listing by the id to display on the view listing page*/
router.get('/listing/:id', function (req, res, next) {
   let token = req.headers['jwt'];
   let org_id = req.params.id;
   if (token) {
      authService.verifyUser(token).then(user => {
         if (user) {
            models.listings.findByPk(req.params.id)
               .then(listing => {
                  console.log(listing);
                  res.status(200).json(listing);
               })
         } else {
            res.status(401).json({
               message: 'Not today satan!'
            })
         }
      })
   } else {
      res.status(500).json({
         message: 'Internal server error.'
      });
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
           include: { model: models.listings }
        }).then(listings_data => {
           res.status(200).json( {listings: listings_data })
        })
     } else {
      res.status(400).json({ message: 'Not today Satan!'})
     }
      })
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
            }).then(function(result) {
               if(result) {
                  res.status(200).json({ message: 'Listing marked for deletion!'})
               } else {
                  res.status(400).json({ message: 'Not today satan!'})
               }
            })
         } else {
            res.status(500).json({ message: 'Internal server error.'})
         }
      })
   }
});

module.exports = router;