const express = require('express');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database
        res.send(req.user);
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
    const username = req.body.username;
    const family_name = req.body.family_name;
    const password = encryptLib.encryptPassword(req.body.password);

    var saveUser = {
        username: req.body.username,
        family_name: req.body.family_name,
        password: encryptLib.encryptPassword(req.body.password)
    };
    //console.log('new user:', saveUser);
    pool.query('INSERT INTO family (username, family_name, password) VALUES ($1, $2, $3)', [saveUser.username, saveUser.family_name, saveUser.password], (err, result) => {
        if (err) {
            console.log("Error inserting data: ", err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
    // Use passport's built-in method to log out the user
    req.logout();
    res.sendStatus(200);
});

router.put('/update/:id', function (req, res) {
    if (req.isAuthenticated()) {
        const username = req.body.username;
        const family_name = req.body.family_name;
        const password = encryptLib.encryptPassword(req.body.password);

        var saveUser = {
            username: username,
            family_name: family_name,
            password: password
        };

        pool.query('UPDATE family SET username=$1, family_name=$2, password=$3 WHERE id=$4', [saveUser.username, saveUser.family_name, saveUser.password, req.params.id], (err, result) => {
            if (err) {
                console.log("Error inserting data: ", err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});


module.exports = router;