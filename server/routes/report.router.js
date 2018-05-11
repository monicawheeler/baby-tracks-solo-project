const express = require('express');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();


// GET children based on family id
router.get('/family/:id', (req, res) => {
  // check if logged in
  if (req.isAuthenticated()) {

      // find joined records from the child and family tables
      // where family id key for family matches child.family_id
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

module.exports = router;