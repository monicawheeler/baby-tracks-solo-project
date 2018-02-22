const express = require('express');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();

// Add child to database
router.post('/', (req, res, next) => {
    // check if logged in
    if (req.isAuthenticated()) {
        // post
        const first_name = req.body.first_name;
        const dob = req.body.dob;
        const gender = req.body.gender;
        const family_id = req.body.family_id;

        var saveChild = {
            first_name: first_name,
            dob: dob,
            gender: gender,
            family_id: family_id
        }

        console.log('save child', saveChild);
        const queryText = 'INSERT INTO child (first_name, dob, gender, family_id) VALUES ($1, $2, $3, $4)';
        pool.query(queryText, [saveChild.first_name, saveChild.dob, saveChild.gender, saveChild.family_id], (err, result) => {
            if (err) {
                console.log('Error inserting data', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        })

    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});

// GET children based on family id
router.get('/family/:id', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
        const queryText = 'SELECT child.id, child.first_name, child.dob, child.gender FROM child JOIN family ON family.id = child.family_id WHERE child.family_id=$1';
        pool.query(queryText, [req.params.id], (err, result) => {
            if (err) {
                //console.log('error in get request for children by family id');
                res.sendStatus(500);
            } else {
                // console.log('success in get request for children by family id');
                // console.log('result', result.rows);
                res.send(result.rows);
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});

router.get('/category', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
        const queryText = 'SELECT category.id, category_name FROM category';
        pool.query(queryText)
            .then((result) => {
                //console.log('query results: ', result);
                res.send(result.rows); //send back the results
            })
            //error handling
            .catch((err) => {
                console.log('error making select query: ', err);
                res.sendStatus(500);
            });
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});


router.delete('/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        const queryText = 'DELETE FROM child WHERE id=$1';
        pool.query(queryText, [req.params.id])
            // runs on successful query
            .then((result) => {
                //console.log('query results: ', result);            
                res.sendStatus(200);
            })
            // error handling
            .catch((err) => {
                console.log('error making select query:', err);
                res.sendStatus(500);
            });
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});


router.put('/update/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        console.log('req.body', req.body);

        const queryText = 'UPDATE child SET first_name=$1, dob=$2, gender=$3 WHERE id=$4;';
        pool.query(queryText, [req.body.first_name, req.body.dob, req.body.gender, req.params.id])
            // runs on successful query
            .then((result) => {
                console.log('query results: ', result);
                res.sendStatus(200);
            })
            // error handling
            .catch((err) => {
                console.log('error making select query:', err);
                res.sendStatus(500);
            });
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});

module.exports = router;