const express = require('express');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();

// Add event to database
router.post('/', (req, res, next) => {
    // check if logged in
    if (req.isAuthenticated()) {
        // post
        const date = req.body.date;
        const time = req.body.time;
        const notes = req.body.notes;
        const child_id = req.body.child_id;
        const category_id = req.body.category_id;

        var saveEvent = {
            date: date,
            time: time,
            notes: notes,
            child_id: child_id,
            category_id: category_id
        }

        console.log('save event', saveEvent);
        const queryText = 'INSERT INTO event (date, time, notes, child_id, category_id) VALUES ($1, $2, $3, $4, $5)';
        pool.query(queryText, [saveEvent.date, saveEvent.time, saveEvent.notes, saveEvent.child_id, saveEvent.category_id], (err, result) => {
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
