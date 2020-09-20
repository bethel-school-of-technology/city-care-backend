const express = require('express');
const router = express.Router();

const listControl = require('../controllers/listings.controller');

//Create an org listing
router.post('/create', listControl.create_listing);

//Get all of an organization listings to display on the profile page
router.get('/listings', listControl.get_listings);


/*Get an org listing by the id to display on the view listing page*/
router.get('/listing/:id', listControl.get_one_listing);

//Get an organization listings with the organization information that made the listing based on the logged in users zip code
router.get('/findOrgs', listControl.get_listings_with_users);

//update a listing 
router.put('/update/:id', listControl.update_listing);

/*Delete an org listing*/
router.delete('/delete/:id', listControl.delete_listing);

module.exports = router;