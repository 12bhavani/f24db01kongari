var express = require('express');
kitten_controlers = require('../controllers/kitten');
var router = express.Router();

/* GET kitten page. */
// router.get('/', function(req, res, next) {
//   res.render('kitten', { title: 'Search Results Kitten' });
// });

router.get('/', kitten_controlers.kitten_view_all_Page);
router.get('/:id', kitten_controlers.kitten_detail);

module.exports = router;
