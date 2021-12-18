const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
    const query = `SELECT * FROM item
                    ORDER BY "id" ASC`;
    pool.query(query)
    .then( result => {
    res.send(result.rows);
    })
    .catch(err => {
    console.log('ERROR: Get all item', err);
    res.sendStatus(500)
    })
});

router.get('/search', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
 router.post('/', (req, res) => {
  console.log('POST req.body:',req.body);
  // RETURNING "id" will give us back the id of the created movie
  const query = `INSERT INTO "item" ("qr_id", "name","put_in_box", "value", "creator_user_id", "last_modified_user_id", "event_id", "destination_id", "image_path")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING "id";`
  pool.query(query, [req.body.qr, req.body.item_name, 'TRUE', req.body.value, 1, 1, 1, req.body.destination, req.body.image_url ])
  .then(result => {
        res.sendStatus(201);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
  })

module.exports = router;
