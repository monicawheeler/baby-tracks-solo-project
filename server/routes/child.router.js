const express = require('express');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();

// Adds child to child table
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
      pool.query('INSERT INTO child (first_name, dob, gender, family_id) VALUES ($1, $2, $3, $4)',
      [saveChild.first_name, saveChild.dob, saveChild.gender, saveChild.family_id], (err, result) => {
        if (err) {
          console.log('Error inserting data', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      }
  )
      
    } else {
      // failure best handled on the server. do redirect here.
      res.sendStatus(403);
    }
  });

module.exports = router;
