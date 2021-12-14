const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const query = `SELECT * FROM box
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

// GET route - items in a box
router.get('/items', (req, res) => {
  const query = `SELECT * FROM box_item
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

router.get('/search', (req, res) => {
  // GET route code here
});

router.get('/box-items', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
