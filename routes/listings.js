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
                   res.status(400).json({message: 'Not today satan!'})
                }
            })
         } else {
            res.status(500).json({message: 'Not today satan!'})
         }
      });
   }
});
//update a listing 
router.put('/:id', function (req, res, next) {
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
           message: 'Unable to update this user!'
         });
       }
     });
   } else {
     res.status(500).json({
       message: 'Internal server error!'
     });
   }
 });
//Get all of the organization listings
router.get('/listings', function (req, res, next) {
   let token = req.headers['jwt'];
   if(token) {
             authService.verifyUser(token).then(user => {
               let org_id = parseInt(req.params.id);
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
             });
   }
});
/*Get an org listing by the id */
router.get('/:id', function (req, res, next) {
   let token = req.headers['jwt'];
   let org_id = req.params.id;
   if (token) {
      authService.verifyUser(token).then(user => {
         if (user) {
            models.listings.findByPk(req.params.id)
               .then(request => {
                  console.log(request);
                  res.status(200).json(request);
               })
         } else {
            res.status(401).json({
               message: 'Not today satan!'
            })
         }
      })
   } else {
      res.status(500).json({
         message: 'Not today satan!'
      });
   }
});
//Get an organization listings with the organization information that made the listing
router.get('/county/listings', function (req, res, next) {
   let token = req.headers['jwt'];
   let fetchedUser;
   if (token) {
             authService.verifyUser(token).then(user => {
                       if (user) {
                                 models.users
             .findAll({
               where: { org_id: user.id, county: user.county }, 
               include: {model: models.listings}, 
               where: {zip: user.zip }
             }).then(zip_listings => {
                fetchedUser = user;
                       res.status(200).json(zip_listings);
             })
             } else {
                       res.status(400).json({message: 'Could not find anything that matches'});
             }
   })
} else {
      res.status(500).json({message: 'Internal Server Error!'})
}
});


/*Delete an org listing*/
router.delete('/:id', function(req, res, next) {
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
                  console.log(result);
                  res.status(200).json({message: 'Listing marked for deletion!'})
               } else {
                  res.status(400).json({message: 'Not today satan!'})
               }
            })
         } else {
            res.status(500).json({message: 'Not today satan!'})
         }
      })
   }
});
module.exports = router;