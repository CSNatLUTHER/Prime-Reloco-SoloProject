const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('fetching all events for user', req.query);
  // GET route code here
    const query = `SELECT first_name AS owner_first_name, last_name AS owner_last_name, event.id, name, move_date, event.create_date, creator_user_id, share_code FROM user_event
                  JOIN event ON user_event.event_id=event.id
                  JOIN "user" ON "user".id=event.creator_user_id
                  WHERE user_event.user_id = ${req.query.userid}
                  GROUP BY event.id, first_name, last_name
                  ORDER BY event.create_date DESC`;
    pool.query(query)
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all events', err);
        res.sendStatus(500)
      })
});

/**
 * POST route template
 */
 router.post('/', (req, res) => {
  console.log('POST req.body:',req.body);
  // RETURNING "id" will give us back the id of the created event
  const query = `INSERT INTO "event" ("name", "move_date","creator_user_id", "share_code")
                VALUES ($1, $2, $3, $4)
                RETURNING "id";`
  pool.query(query, [req.body.event_name, req.body.move_date, req.body.user_id, req.body.share_code ])
  .then(result => {
    console.log(result.rows[0].id);
    const newEventId = result.rows[0].id
    // Now handle the genre reference
    const userEventQuery = `INSERT INTO "user_event" ("user_id", "event_id")
                            VALUES (${req.body.user_id}, ${newEventId})
                            RETURNING "event_id";`
      // SECOND QUERY ADDS EVENT_USER JOIN RECORD FOR THAT NEW EVENT
      pool.query(userEventQuery)
  .then(result => {
        console.log(result.rows[0].event_id);
        const newEventId = result.rows[0].event_id

        // Now handle the genre reference
        const getEventQuery = `SELECT first_name AS owner_first_name, last_name AS owner_last_name, event.id, name, move_date, event.create_date, creator_user_id, share_code FROM user_event
                              JOIN event ON user_event.event_id=event.id
                              JOIN "user" ON "user".id=event.creator_user_id
                              WHERE event.id=${newEventId}
                              GROUP BY event.id, first_name, last_name;`
          // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
          pool.query(getEventQuery).then(result => {
            //Now that both are done, send back success!
            console.log('newItemQuery Result:', result.rows);
            res.send(result.rows);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
  })})})})


  router.delete('/', (req, res) => {
    console.log('EVENT DELETE req.query:',req.query);
    const query = `	DELETE FROM box_item
                    WHERE event_id = ${req.query.event_id};`
    pool.query(query)
    .then(result => {
    const query = `DELETE FROM item
                   WHERE event_id = ${req.query.event_id};;`
    pool.query(query)
    .then(result => {
    const query = `DELETE FROM box
                   WHERE event_id = ${req.query.event_id};;`
    pool.query(query)
    .then(result => {
      const query = `DELETE FROM user_event
                     WHERE event_id = ${req.query.event_id};;`
      pool.query(query)
    .then(result => {
    const query = `DELETE FROM event
                   WHERE id = ${req.query.event_id};;`
    pool.query(query)
    res.sendStatus(200)
    }).catch(err => {
    console.log(err);
    res.sendStatus(500)
    })
    })
    })
    })
  })
module.exports = router;
