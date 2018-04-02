const express = require('express');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();


// POST contact to database
router.post('/', (req, res, next) => {
    // check if logged in
    if (req.isAuthenticated()) {
        // post
        const name = req.body.name;
        const type = req.body.type;
        const telephone = req.body.telephone;
        const address1 = req.body.address1;
        const address2 = req.body.address2;
        const city = req.body.city;
        const state = req.body.state;
        const zip = req.body.zip;
        const notes = req.body.notes;
        const family_id = req.body.family_id;

        var saveContact = {
            name,
            type,
            telephone,
            address1,
            address2,
            city,
            state,
            zip,
            notes,
            family_id
        }

        // Insert contact record into contact table
        const queryText = 'INSERT INTO emergencycontacts (name, type, telephone, address1, address2, city, state, zip, notes, family_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        pool.query(queryText, [saveContact.name, saveContact.type, saveContact.telephone, saveContact.address1, saveContact.address2, saveContact.city, saveContact.state, saveContact.zip, saveContact.notes, saveContact.family_id], (err, result) => {
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


module.exports = router;