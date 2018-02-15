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
        const datetime = req.body.datetime;

        var saveEvent = {
            date: date,
            time: time,
            notes: notes,
            child_id: child_id,
            category_id: category_id,
            datetime: datetime
        }

        console.log('save event', saveEvent);
        const queryText = 'INSERT INTO event (date, time, notes, child_id, category_id, datetime) VALUES ($1, $2, $3, $4, $5, $6)';
        pool.query(queryText, [saveEvent.date, saveEvent.time, saveEvent.notes, saveEvent.child_id, saveEvent.category_id, saveEvent.datetime], (err, result) => {
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
router.get('/child/:id', (req, res) => {
    console.log('getting into get in router');
    
    const queryText = 'SELECT event.date, event.time, event.notes, event.datetime, category.category_name FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id=$1 ORDER BY category.category_name';
    pool.query(queryText, [req.params.id], (err, result) => {
        if (err) {
            //console.log('error in get request for children by family id');
            res.sendStatus(500);
        } else {
            // console.log('success in get request for children by family id');
            // console.log('result', result.rows);
            res.send(result.rows);
        }
    })
});


// GET feeding category by child id 
router.get('/category/feeding/:id', (req, res) => {
    
    const queryText = 'SELECT event.date, event.time, event.notes, event.datetime, category.category_name FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id = $1 AND event.category_id = 1 ORDER BY datetime DESC LIMIT 1';
    pool.query(queryText, [req.params.id], (err, result) => {
        if (err) {
            //console.log('error in get request for children by family id');
            res.sendStatus(500);
        } else {
            // console.log('success in get request for children by family id');
            // console.log('result', result.rows);
            res.send(result.rows);
        }
    })
});

// GET sleeping category by child id 
router.get('/category/sleeping/:id', (req, res) => {
    
    const queryText = 'SELECT event.date, event.time, event.notes, event.datetime, category.category_name FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id = $1 AND event.category_id = 2 ORDER BY datetime DESC LIMIT 1';
    pool.query(queryText, [req.params.id], (err, result) => {
        if (err) {
            //console.log('error in get request for children by family id');
            res.sendStatus(500);
        } else {
            // console.log('success in get request for children by family id');
            // console.log('result', result.rows);
            res.send(result.rows);
        }
    })
});


// GET diapering category by child id 
router.get('/category/diapering/:id', (req, res) => {
    
    const queryText = 'SELECT event.date, event.time, event.notes, event.datetime, category.category_name FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id = $1 AND event.category_id = 3 ORDER BY datetime DESC LIMIT 1';
    pool.query(queryText, [req.params.id], (err, result) => {
        if (err) {
            //console.log('error in get request for children by family id');
            res.sendStatus(500);
        } else {
            // console.log('success in get request for children by family id');
            // console.log('result', result.rows);
            res.send(result.rows);
        }
    })
});

// GET medication category by child id 
router.get('/category/medication/:id', (req, res) => {
    
    const queryText = 'SELECT event.date, event.time, event.notes, event.datetime, category.category_name FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id = $1 AND event.category_id = 4 ORDER BY datetime DESC LIMIT 1';
    pool.query(queryText, [req.params.id], (err, result) => {
        if (err) {
            //console.log('error in get request for children by family id');
            res.sendStatus(500);
        } else {
            // console.log('success in get request for children by family id');
            // console.log('result', result.rows);
            res.send(result.rows);
        }
    })
});


// GET other category by child id 
router.get('/category/other/:id', (req, res) => {
    
    const queryText = 'SELECT event.date, event.time, event.notes, event.datetime, category.category_name FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id = $1 AND event.category_id = 5 ORDER BY datetime DESC LIMIT 1';
    pool.query(queryText, [req.params.id], (err, result) => {
        if (err) {
            //console.log('error in get request for children by family id');
            res.sendStatus(500);
        } else {
            // console.log('success in get request for children by family id');
            // console.log('result', result.rows);
            res.send(result.rows);
        }
    })
});

module.exports = router;

// Get event based on the child and the category
// **************************************************
// SELECT event.date, event.time, event.notes
// FROM event
// JOIN child ON child.id = event.child_id
// WHERE event.child_id = 1 AND event.category_id = 1
// ORDER BY datetime DESC LIMIT 1;