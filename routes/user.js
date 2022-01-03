const express = require('express');
const router = express.Router();
// Express Validator for forms
const { check, validationResult } = require('express-validator');
// Require in user model
const User = require('../models/User')
// Bring in Gravatar
const gravatar = require('gravatar');
// Bring in bcrypt
const bcrypt = require('bcryptjs');

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
],
    async (req,res) => {
    // console.log(req.body)
    // Declare constant of errors set to the validation result
    const errors = validationResult(req)
    // If errors, return 400 error and error array in JSON
    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() } );
    } 
    try {
        // See if User already exists
        let user = await User.findOne({ email });
            //IF user exists, send error
            if(user) {
                res.status(400).json({ errors: [{msg: 'User already exists' }] });
            }
        const { name, email, password } = req.body;
        // GET User's gravatar
        // Gravatar settings
        const avatar = gravatar.url(email, {
            // img size
            s: '200',
            // img rating
            r: 'pg',
            // Default if no gravatar exists
            d: 'mm'
        });
        // creates new user, BUT does not save yet
        user = new User({
            name,
            email,
            avatar,
            password
        });
        // Need to encrypt password before saving it to db
        // create salt
        const salt = await bcrypt.genSalt(10);
        // hash password. Takes in plain text password and salt
        user.password = await bcrypt.hash(password, salt);
        // Save to db
        // Returns promise so await
        await user.save();
        // TO DO: Return JSON Web token

        res.send('User Registered')
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;