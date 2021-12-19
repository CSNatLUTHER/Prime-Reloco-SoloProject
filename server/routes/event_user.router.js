const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
    const query = `SELECT first_name, last_name FROM "user"
                   JOIN user_event ON user.id=user_event.user_id
                   WHERE user_event.event_id=1
                   ORDER BY user.first_name ASC;`;
    pool.query(query)
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all event_user', err);
        res.sendStatus(500)
      })
});

router.post('/join', (req, res) => {
  console.log('joinEvent POST req.body:',req.body);
  // RETURNING "id" will give us back the id of the created movie
  const query = `SELECT *  FROM event
	               WHERE share_code = '${req.body.eventCode}';`
  pool.query(query)
  .then(result => {
      console.log("Returned Rows", result.rows);
      const eventId = result.rows[0].id

      // Now create user_event record
      const user_event = `INSERT INTO user_event ("user_id", "event_id")
                        VALUES ($1, $2 );` 
      pool.query(user_event, [req.body.user, eventId])
      res.send(result.rows[0]);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
  })});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
