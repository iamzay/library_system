/**
 * Created by zay on 2017/6/2.
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Verify = require('./verify');

// GET users listing
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// register
router.post('/register', function (req, res) {
    User.register(new User({username: req.body.username}),
        req.body.password, function (err, user) {

        console.log('username: '+req.body.username+';password: '+req.body.password);

            if (err) {
                return res.status(500).json({err: err});
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful'});
            });

        });
});

// login
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                err: info
            });
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            let token = Verify.getToken(user);
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

module.exports = router;