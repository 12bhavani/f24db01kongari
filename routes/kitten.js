var express = require('express');
var router = express.Router();

/* GET kitten page. */
router.get('/', function(req, res, next) {
  res.render('kitten', { title: 'Search Results Kitten' });
});

module.exports = router;
