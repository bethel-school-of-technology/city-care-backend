var express = require('express');
var router = express.Router();

const requestControl = require('../controllers/requests.controller');


//Create a user request and store it in the database
router.post('/create', requestControl.create_request );
//Get all of the requests made by an individual for the profile page
router.get('/requests/profile', requestControl.get_users_requests);

//Get all of the users that are not organizations and their requests based on the logged in users zip code
router.get('/findUsers', requestControl.get_all);

//Get a single request made by the individual
router.get('/:id', requestControl.get_one_request);

//update a request 
router.put('/update/:id', requestControl.update_request);

//Delete an existing request
router.delete('/delete/:id', requestControl.delete_request);

module.exports = router;
