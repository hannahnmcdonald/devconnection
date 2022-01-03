const express = require('express');
const router = express.Router();
// Express Validator for forms
const { check, validationResult } = require('express-validator');

// @route GET api/users
// @desc: Test
// @access Public
router.get('/', (req,res) => 
    res.send('User Route')
);

//POST
router.post('/', [
    // Checks that name is not empty
    // Validator will NOT take an empty string
    check('name', 'Name is required')
        .not()
        .isEmpty(),
        // Chrecks for valid email 
    check('email', 'Please include a valid email')
        .isEmail(),
        // Checks that password is present and that it has more than the minimum characters.
    check('password', 'Please use a password with 6 or more characters!')
        .isLength({ min: 6 })
],(req,res) => {
    // console.log(req.body)
    // Declare constant of errors set to the validation result
    const errors = validationResult(req)
    // If errors, return 400 error and error array in JSON
    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() } );
    }

    // TO DO:
    // See if user exists
    //IF user exists, send error
    // GET User's gravatar
    // Encrypt password using BCRYPT
    // Return JSON Web token

    res.send('User Route')
});

module.exports = router;