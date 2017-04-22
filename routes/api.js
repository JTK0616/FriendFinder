var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/friends', function(req, res, next) {
  res.status(200).end();
});

module.exports = router;