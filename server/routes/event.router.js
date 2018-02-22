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
        const notes = req.body.notes;
        const child_id = req.body.child_id;
        const category_id = req.body.category_id;
        const datetime = req.body.datetime;

        var saveEvent = {
            notes: notes,
            child_id: child_id,
            category_id: category_id,
            datetime: datetime
        }
        // (child_id, notes, category_id, familyId, datetime)
        console.log('save event', saveEvent);
        const queryText = 'INSERT INTO event (child_id, notes, category_id, datetime) VALUES ($1, $2, $3, $4)';
        pool.query(queryText, [saveEvent.child_id, saveEvent.notes, saveEvent.category_id, saveEvent.datetime], (err, result) => {
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

// GET children based on child id
router.get('/child/:id', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
        const queryText = 'SELECT event.id, event.notes, event.datetime, category.category_name FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id=$1 ORDER BY event.datetime DESC';
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

// GET feeding category by child id 
router.get('/category/feeding/:id', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
        const queryText = 'SELECT event.id, event.notes, event.datetime, category.category_name, event.child_id FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id = $1 AND event.category_id = 1 ORDER BY datetime DESC LIMIT 1';
        pool.query(queryText, [req.params.id], (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(result.rows);
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});

// GET sleeping category by child id 
router.get('/category/sleeping/:id', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
        const queryText = 'SELECT event.id, event.notes, event.datetime, category.category_name, event.child_id FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id = $1 AND event.category_id = 2 ORDER BY datetime DESC LIMIT 1';
        pool.query(queryText, [req.params.id], (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(result.rows);
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});

// GET diapering category by child id 
router.get('/category/diapering/:id', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
        const queryText = 'SELECT event.id, event.notes, event.datetime, category.category_name, event.child_id FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id = $1 AND event.category_id = 3 ORDER BY datetime DESC LIMIT 1';
        pool.query(queryText, [req.params.id], (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(result.rows);
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});

// GET bathing category by child id 
router.get('/category/bathing/:id', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
        const queryText = 'SELECT event.id, event.notes, event.datetime, category.category_name, event.child_id FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id = $1 AND event.category_id = 6 ORDER BY datetime DESC LIMIT 1';
        pool.query(queryText, [req.params.id], (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(result.rows);
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});

// GET medication category by child id 
router.get('/category/medication/:id', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
        const queryText = 'SELECT event.id, event.notes, event.datetime, category.category_name, event.child_id FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id = $1 AND event.category_id = 7 ORDER BY datetime DESC LIMIT 1';
        pool.query(queryText, [req.params.id], (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(result.rows);
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});

// GET other category by child id 
router.get('/category/other/:id', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
        const queryText = 'SELECT event.id, event.notes, event.datetime, category.category_name, event.child_id FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id = $1 AND event.category_id = 8 ORDER BY datetime DESC LIMIT 1';
        pool.query(queryText, [req.params.id], (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(result.rows);
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});

router.put('/update/:id', function(req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        const notes = req.body.notes;
        var saveNotes = {
            notes: notes
        };
        pool.query('UPDATE event SET notes=$1 WHERE id=$2', [saveNotes.notes, req.params.id], (err, result) => {
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
