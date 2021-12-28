const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
    const query = `SELECT * FROM message
                   ORDER BY "id" ASC`;
    pool.query(query)
    .then( result => {
    res.send(result.rows);
    })
    .catch(err => {
    console.log('ERROR: Get all messages', err);
    res.sendStatus(500)
    })
});

/**
 * POST route template
 */
 router.post('/', (req, res) => {
  console.log('POST Message with req.body:',req.body);
  const query = `INSERT INTO "contact_us" ("name", "email","subject", "message")
                VALUES ($1, $2, $3, $4)`
  pool.query(query, [req.body.name, req.body.email, req.body.subject, req.body.message ])
  .then(result => {
        const query = `SELECT * FROM "contact_us"`
          pool.query(query).then(result => {
            console.log('newItemQuery Result:', result.rows);
            res.send(result.rows);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
  })})})

module.exports = router;
