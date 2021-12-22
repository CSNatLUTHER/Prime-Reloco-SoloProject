const express = require('express');
// const pool = require('../modules/pool');
const router = express.Router();
// const generateUploadURL = require('../modules/s3')
// import { generateUploadURL } from '../s3';


/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('In photo_upload.router!!!');
  res.sendStatus(200)

  // const url = await generateUploadURL();
  // res.send({url});
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
