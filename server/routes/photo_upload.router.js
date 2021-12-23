const express = require('express');
// import s3 from '../s3';
const s3 = require('../modules/s3')
// const pool = require('../modules/pool');
const router = express.Router();
// const generateUploadURL = require('../modules/s3')
// import { generateUploadURL } from '../s3';


/**
 * GET route template
 */
router.get('/', async (req, res) => {
  // GET route code here
  console.log('In photo_upload.router!!!');
  const url = await s3.generateUploadURL()
  console.log('This is what came back from the url:', {url});
  res.send({url})

  // const url = await generateUploadURL();
  // res.send({url});
});

/**
 * POST route template
 */
router.put('/', (req, res) => {
  // POST route code here
});

module.exports = router;
