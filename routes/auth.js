const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require ('../models/User');
const config = require('config');
// Express Validator for forms
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');

// @route GET routes/auth
// @desc: 
// @access Public
router.get('/', auth, async (req,res) => {
    try { 
        // W/O password
        const user = await User
            .findById(req.user.id)
            .select('-password');
        res
            .json(user);
    } catch(err) {
        console.error(err.message);
        res
            .status(500)
            .send('Server Error');
    }
});

// @route POST routes/auth
// @desc: Authenticate user & get token
// @access Public
router.get('/', (req,res) => 
    res.send('User Route')
);

//POST
router.post('/', [
     // Checks for valid email 
    check('email', 'Please include a valid email')
        .isEmail(),
        // Checks that password exists
    check('password', 'Password is required!')
        .exists()
],
    async (req,res) => {
    // console.log(req.body)
        // Declare constant of errors set to the validation result
    const errors = validationResult(req)
    // If errors, return 400 error and error array in JSON
    if(!errors.isEmpty()) {
        return res
            .status(400)
            .json( { errors: errors.array() } );
    } 
    const { email, password } = req.body;
    try {
        // See if User already exists
        let user = await User
            .findOne({ email });
            //IF user exists, send error
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] 
                });
            }
        // Match User & password w/bcrypt compare method
            // Takes in plain text, and hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] 
            });
        }

        // JWT 
        const payload = {
            user: {
                // abstraction of _id from mongoose
                id: user.id
            }
        }
        // Bring in JWTSecret from config
        jwt.sign(
            payload, 
            config
                .get('jwtSecret'),
            {expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
        // res.send('User Registered')
    } catch(err) {
        console.error(err.message);
            res
                .status(500)
                .send('Server Error');
        }
    }
);

module.exports = router;