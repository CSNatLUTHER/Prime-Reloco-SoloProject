const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
    console.log(req.query);
    const query = `SELECT item.id, item.qr_id, item.name, item.put_in_box, item.value, 
                   item.create_date, item.creator_user_id, item.last_update_date, 
                   item.last_modified_user_id, item.event_id, item.destination_id, 
                   item.image_path, destination.destination 
                   FROM item
                   JOIN destination ON item.destination_id=destination.id
                   WHERE item.event_id=${req.query.event}
                   ORDER BY item.id ASC`;
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
  console.log('in search with:', req.query);
  // GET route code here
    const query = `SELECT item.id, item.qr_id, item.name, item.put_in_box, item.value, 
                   item.create_date, item.creator_user_id, item.last_update_date, 
                   item.last_modified_user_id, item.event_id, item.destination_id, 
                   item.image_path, destination.destination 
                   FROM item
                   JOIN destination ON item.destination_id=destination.id
                   WHERE (item.name ILIKE '%${req.query.searchText}%' AND item.event_id=${req.query.event})
                   OR (item.qr_id ILIKE '%${req.query.searchText}%' AND item.event_id=${req.query.event})
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

router.get('/box_item', (req, res) => {
  console.log('in GET box_item search with:', req.query);
  // GET route code here
    const query = `SELECT * FROM box_item
                   JOIN box ON box.id=box_item.box_id
                   WHERE box_item.item_id=${req.query.item_id};`
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
  const query = `INSERT INTO "item" ("qr_id", "name","put_in_box", "value", "creator_user_id", "last_modified_user_id", "event_id", "destination_id", "image_path")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING "id";`
  pool.query(query, [req.body.qr, req.body.item_name, req.body.put_in_box, req.body.value, req.body.creator_user_id, req.body.last_modified_user_id, req.body.event, req.body.destination, req.body.image_url ])
  .then(result => {
        console.log(result.rows[0].id);
        const newItemId = result.rows[0].id
        const getItemQuery = `SELECT * FROM item
                              WHERE id=${newItemId}`
          pool.query(getItemQuery).then(result => {
            console.log('newItemQuery Result:', result.rows);
            res.send(result.rows);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
  })})})

module.exports = router;
