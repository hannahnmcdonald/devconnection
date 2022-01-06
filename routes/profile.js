const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// Models
const Profile = require('../models/Profile');
const User= require('../models/User');

// @route GET routes/profile/me
// @desc: GET current users profile
// @access Private
// Use Auth due to private route
router.get('/me', auth, async (req,res) => {
    try {
        // Find user with user ID and populate the user with name and avatar
        const profile = await Profile.findOne( { user: req.user.id }).populate('user', ['name', 'avatar']);
        // If no profile, send err
        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }
        // Return profile
        res.json(profile)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;