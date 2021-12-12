const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
    const query = `SELECT first_name, last_name FROM account
                   JOIN account_event ON account.id=account_event.account_id
                   WHERE account_event.event_id=1
                   ORDER BY account.first_name ASC;`;
    pool.query(query)
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all event_user', err);
        res.sendStatus(500)
      })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
