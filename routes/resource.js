// routes/resource.js
var express = require('express');
var router = express.Router();

// Require controller modules
var api_controller = require('../controllers/api');
var kitten_controller = require('../controllers/kitten');

/// API ROUTE ///
// GET resources base
router.get('/kittens', kitten_controller.kitten_list);

/// KITTEN ROUTES ///
// POST request for creating a Kitten
router.post('/kittens', kitten_controller.kitten_create_post);

// DELETE request to delete a Kitten
router.delete('/kittens/:id', kitten_controller.kitten_delete);

// PUT request to update a Kitten
router.put('/kittens/:id', kitten_controller.kitten_update_put);

// GET request for one Kitten
router.get('/kittens/:id', kitten_controller.kitten_detail);

module.exports = router;
