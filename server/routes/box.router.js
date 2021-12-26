const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log(req.query);
  const query = `SELECT * FROM box
                WHERE event_id=${req.query.event}
                ORDER BY "id" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all boxes', err);
      res.sendStatus(500)
    })
});

router.get('/box-items', (req, res) => {
  console.log('In GET box-items', req.query);
  const query = `SELECT *  FROM box_item
	              JOIN item ON box_item.item_id=item.id
	              WHERE box_item.box_id=${req.query.id}
                ORDER BY item.create_date DESC;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: GET active_box_contents', err);
      res.sendStatus(500)
    })
  // GET route code here
});

router.get('/search', (req, res) => {
  console.log('in search with:', req.query);
  // GET route code here
    const query = `SELECT * FROM box
                   WHERE (box.name ILIKE '%${req.query.searchText}%' AND box.event_id=${req.query.event})
                   OR (box.qr_id ILIKE '%${req.query.searchText}%' AND box.event_id=${req.query.event})
                   ORDER BY "create_date" DESC;`
    pool.query(query)
    .then( result => {
    res.send(result.rows);
    })
    .catch(err => {
    console.log('ERROR: Get all item', err);
    res.sendStatus(500)
    })
});
/**
 * POST route template
 */

router.post('/', (req, res) => {
console.log('POST req.body:',req.body);

const query = `INSERT INTO "box" ("qr_id", "name", "creator_user_id", "last_modified_user_id", "event_id", "size", "weight", "destination_id")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
              RETURNING "id";`
pool.query(query, [req.body.qr, req.body.box_name, req.body.creator_user_id, req.body.last_modified_user_id, req.body.event, req.body.box_size, req.body.box_weight, req.body.destination])
.then(result => {
      console.log(result.rows[0].id);
      const newItemId = result.rows[0].id
      const getItemQuery = `SELECT * FROM box
                            WHERE id=${newItemId}`
        pool.query(getItemQuery).then(result => {
          console.log('newItemQuery Result:', result.rows);
          res.send(result.rows);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
})})})

router.post('/add_to_box', (req, res) => {
  console.log('POST req.body:',req.body);

  const query = `SELECT * FROM box
	                WHERE qr_id = '${req.body.boxQr}' AND event_id=${req.body.event};`
  pool.query(query)
  .then(result => {
      console.log("Returned Rows", result.rows);
      const boxId = result.rows[0].id

      // // Now create box_item record
      const box_item = `INSERT INTO box_item ("item_id", "box_id", "event_id","creator_user_id")
                        VALUES ($1, $2, $3, $4 );` 
      pool.query(box_item, [req.body.item_id, boxId, req.body.event, req.body.user])
      res.send(result.rows[0]);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
  })});

module.exports = router;
