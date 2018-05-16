const express = require('express');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();


// GET children based on family id
router.get('/:childId/:theDay', (req, res) => {    
// check if logged in
if (req.isAuthenticated()) {
    let childId = req.params.childId;
    let theDay = req.params.theDay;

    // use multiple params (child and date) to query based
    // on child id and the date greater than or equal to the one selected
    const queryText = 'SELECT category.category_name, event.id, event.notes, event.datetime FROM event JOIN child ON child.id = event.child_id JOIN category ON category.id = event.category_id WHERE event.child_id=$1 AND event.datetime >=$2 ORDER BY event.datetime DESC';
    pool.query(queryText, [req.params.childId, req.params.theDay])
    .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        res.sendStatus(500);
    })

    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
}
});

module.exports = router;
