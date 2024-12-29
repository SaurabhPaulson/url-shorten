const express = require('express');
const passport = require('passport');

const router = express.Router();

// Google authentication routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, send JWT
        res.json({ message: 'Authenticated successfully', user: req.user });
    }
);

module.exports = router;
