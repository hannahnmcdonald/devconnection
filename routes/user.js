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
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please use a password with 6 or more characters!')
        .isLength({ min: 6 })
],(req,res) => {
    // console.log(req.body)
    const errors = validationResult(req)
    // If errors, return 400 error and error array in JSON
    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() } );
    }
    res.send('User Route')
});

module.exports = router;