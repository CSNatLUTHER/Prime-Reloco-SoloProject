const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET USERS TIED TO A SPECIFIC EVENT
router.get('/', (req, res) => {
  console.log('In GET event_user get with:', req.query);
    const query = `SELECT "user".id, first_name, last_name, event.creator_user_id FROM "user"
                   JOIN user_event ON "user".id=user_event.user_id
                   JOIN event ON user_event.event_id=event.id
                   WHERE user_event.event_id=${req.query.id}
                   GROUP BY event.creator_user_id, "user".id
                   ORDER BY "user".first_name ASC;`;
    pool.query(query)
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all event_user', err);
        res.sendStatus(500)
      })
});

// USER JOINS AN EVENT
router.post('/join', (req, res) => {
  console.log('joinEvent POST req.body:',req.body);
  const query = `SELECT first_name AS owner_first_name, last_name AS owner_last_name, event.id, name, move_date, event.create_date, creator_user_id, share_code FROM user_event
                 JOIN event ON user_event.event_id=event.id
                 JOIN "user" ON "user".id=event.creator_user_id
	               WHERE share_code = '${req.body.eventCode}'
                 GROUP BY event.creator_user_id, "user".id, event.id;`
  pool.query(query)
  .then(result => {
      console.log("Returned Rows", result.rows);
      const eventId = result.rows[0].id
      const user_event = `INSERT INTO user_event ("user_id", "event_id")
                        VALUES ($1, $2 );` 
      pool.query(user_event, [req.body.user, eventId])
      res.send(result.rows[0]);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
  })});

// REMOVE A USER FROM THE EVENT
router.delete('/', (req, res) => {
 console.log('In event_user DELETE', req.query);
 const query = `DELETE FROM  user_event
                WHERE (user_event.event_id=${req.query.event_id} AND user_event.user_id=${req.query.user_id});`;
 pool.query(query)
 .then( result => {
 res.sendStatus(200);
 })
 .catch(err => {
 console.log('ERROR: Get all item', err);
 res.sendStatus(500)
 })
});

module.exports = router;
