const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET ALL ITEMS ASSOCIATED WITH AN EVENT
router.get('/', (req, res) => {
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
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all item', err);
      res.sendStatus(500)
    })
});

// RETURN ALL ITEM SEARCH RESULTS
router.get('/search', (req, res) => {
  console.log('in search with:', req.query);
  const query = `SELECT item.id, item.qr_id, item.name, item.put_in_box, item.value, 
                   item.create_date, item.creator_user_id, item.last_update_date, 
                   item.last_modified_user_id, item.event_id, item.destination_id, 
                   item.image_path, destination.destination 
                   FROM item
                   JOIN destination ON item.destination_id=destination.id
                   WHERE (item.name ILIKE '%${req.query.searchText}%' AND item.event_id=${req.query.event})
                   OR (item.qr_id ILIKE '%${req.query.searchText}%' AND item.event_id=${req.query.event})
                   OR (destination.destination ILIKE '%${req.query.searchText}%' AND item.event_id=${req.query.event})
                   ORDER BY "create_date" DESC;`
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all item', err);
      res.sendStatus(500)
    })
});

// RETURN A BOX ASSOCIATED WITH AN ITEM
router.get('/box_item', (req, res) => {
  console.log('in GET box_item search with:', req.query);
  const query = `SELECT box.id, box.qr_id, box.name, box.create_date, 
                   box.creator_user_id, box.last_update_date, box.last_modified_user_id, 
                   box.event_id, box.size, box.weight, box.destination_id, destination.destination  
                   FROM box_item
                   JOIN box ON box.id=box_item.box_id
                   JOIN destination ON box.destination_id=destination.id
                   WHERE box_item.item_id=${req.query.item_id};`
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all item', err);
      res.sendStatus(500)
    })
});


// CREATE NEW ITEM
router.post('/', (req, res) => {
  console.log('POST req.body:', req.body);
  const query = `INSERT INTO "item" ("qr_id", "name","put_in_box", "value", "creator_user_id", "last_modified_user_id", "event_id", "destination_id", "image_path")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING "id";`
  pool.query(query, [req.body.qr, req.body.item_name, req.body.put_in_box, req.body.value, req.body.creator_user_id, req.body.last_modified_user_id, req.body.event, req.body.destination, req.body.image_url])
    .then(result => {
      console.log(result.rows[0].id);
      const newItemId = result.rows[0].id
      const getItemQuery = `SELECT item.id, item.qr_id, item.name, item.put_in_box, item.value, 
                              item.create_date, item.creator_user_id, item.last_update_date, 
                              item.last_modified_user_id, item.event_id, item.destination_id, 
                              item.image_path, destination.destination 
                              FROM item
                              JOIN destination ON item.destination_id=destination.id
                              WHERE item.id=${newItemId}`
      pool.query(getItemQuery).then(result => {
        console.log('newItemQuery Result:', result.rows);
        res.send(result.rows);
      }).catch(err => {
        console.log(err);
        res.sendStatus(500)
      })
    })
})

// UPDATE AN ITEM
router.put('/', (req, res) => {
  console.log('updateItem PUT req.body:', req.body);
  const query = `UPDATE "item"
                SET "qr_id"=$1, "name"=$2, "put_in_box"=$3, "value"=$4, "last_modified_user_id"=$5, "destination_id"=$6, "image_path"=$7, "last_update_date"= CURRENT_DATE
                WHERE item.id=${req.body.id}
                RETURNING "id";`
  pool.query(query, [req.body.qr, req.body.item_name, req.body.put_in_box, req.body.value, req.body.last_modified_user_id, req.body.destination, req.body.image_url])
    .then(result => {
      console.log(result.rows[0].id);
      const newItemId = result.rows[0].id
      const getItemQuery = `SELECT item.id, item.qr_id, item.name, item.put_in_box, item.value, 
                              item.create_date, item.creator_user_id, item.last_update_date, 
                              item.last_modified_user_id, item.event_id, item.destination_id, 
                              item.image_path, destination.destination 
                              FROM item
                              JOIN destination ON item.destination_id=destination.id
                              WHERE item.id=${newItemId}`
      pool.query(getItemQuery).then(result => {
        console.log('newItemQuery Result:', result.rows);
        res.send(result.rows);
      }).catch(err => {
        console.log(err);
        res.sendStatus(500)
      })
    })
})

// UPDATE ITEM DESTINATION
router.put('/item_destination', (req, res) => {
  console.log('updateItemDestination PUT req.body:', req.body);
  const query = `UPDATE "item"
                SET "destination_id"=7
                WHERE id=${req.body.item_id}
                RETURNING "id";`
  pool.query(query)
    .then(result => {
      console.log(result.rows[0].id);
      const newItemId = result.rows[0].id
      const getItemQuery = `SELECT item.id, item.qr_id, item.name, item.put_in_box, item.value, 
                              item.create_date, item.creator_user_id, item.last_update_date, 
                              item.last_modified_user_id, item.event_id, item.destination_id, 
                              item.image_path, destination.destination 
                              FROM item
                              JOIN destination ON item.destination_id=destination.id
                              WHERE item.id=${newItemId}`
      pool.query(getItemQuery).then(result => {
        console.log('newItemQuery Result:', result.rows);
        res.send(result.rows);
      }).catch(err => {
        console.log(err);
        res.sendStatus(500)
      })
    })
})

// RESET THE ITEM DESTINATIONWHEN REMOVED FROM BOX
router.put('/reset_item_destination', (req, res) => {
  console.log('updateItemDestination PUT req.body:', req.body);
  const query = `UPDATE "item"
                SET "destination_id"=6
                WHERE id=${req.body.id}
                RETURNING "id";`
  pool.query(query)
    .then(result => {
      console.log(result.rows[0].id);
      const newItemId = result.rows[0].id
      const getItemQuery = `SELECT item.id, item.qr_id, item.name, item.put_in_box, item.value, 
                              item.create_date, item.creator_user_id, item.last_update_date, 
                              item.last_modified_user_id, item.event_id, item.destination_id, 
                              item.image_path, destination.destination 
                              FROM item
                              JOIN destination ON item.destination_id=destination.id
                              WHERE item.id=${newItemId}`
      pool.query(getItemQuery).then(result => {
        console.log('newItemQuery Result:', result.rows);
        res.send(result.rows);
      }).catch(err => {
        console.log(err);
        res.sendStatus(500)
      })
    })
})


// DELETE ITEM AND ANY ASSOCIATIONS WITH A BOX
router.delete('/', (req, res) => {
  console.log('In deleteItem router with:', req.query);
  const query = `DELETE FROM box_item
                  WHERE item_id = ${req.query.id}
                  RETURNING item_id;`
  pool.query(query)
    .then(result => {
      const query = `DELETE FROM item
                        WHERE item.id = ${req.query.id};`
      pool.query(query).then(result => {
        res.sendStatus(200);
      }).catch(err => {
        console.log('deleteItem error', err);
        res.sendStatus(500)
      })
    })
})


module.exports = router;
