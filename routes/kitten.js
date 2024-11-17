var express = require('express');
kitten_controlers = require('../controllers/kitten');
kittennew_controlers = require('../controllers/kittendetail');
var router = express.Router();

/* GET kitten page. */
// router.get('/', function(req, res, next) {
//   res.render('kitten', { title: 'Search Results Kitten' });
// });

router.get('/', kitten_controlers.kitten_view_all_Page);
router.get('/:id', kitten_controlers.kitten_detail);
router.get('/detail', kittennew_controlers.kitten_view_one_Page);
router.delete('/:id', kitten_controlers.kitten_delete);

module.exports = router;
