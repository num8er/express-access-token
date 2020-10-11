const express = require('express');
const router = express.Router();

router.get(
  '/',
  (req, res) => {
    res.send('HELLO WORLD from API');
  });

router.get(
  '/test',
  (req, res) => {
    res.send('I AM API TEST ROUTE');
  });

router.get(
  '/token',
  (req, res) => {
    res.send('THIS IS ACCESS TOKEN: ' + req.accessToken);
  });

module.exports = router;
