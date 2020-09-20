var express = require('express');
var router = express.Router();


const authControl = require('../controllers/auth.controller');
const userControl = require('../controllers/users.controller');



//Create a user
router.post('/register', authControl.user_registration);

//Log a user in with email
router.post('/emailLogin', authControl.email_login);

//Log a user in with username
router.post('/usernameLogin', authControl.user_name_login);

/*Get user/org profile using authentication token */
router.get('/profile', userControl.get_profile);

//Get a user by the id 
router.get('/:id', userControl.get_user);


//Update a users information in the database
router.put('/:id', userControl.update_user);

module.exports = router;
