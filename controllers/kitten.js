// controllers/kitten.js
var Kitten = require('../models/kitten'); 


// List of all Kittens
exports.kitten_list = async function(req, res) {
    try {
        let theKittens = await Kitten.find();
        res.json(theKittens);
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};

exports.kitten_view_all_Page = async function(req, res) {
    try {
      const theKittens = await Kitten.find(); // Retrieve all kittens from the database
      res.render('kitten', { title: 'Kitten Search Results', results: theKittens });
    } catch (err) {
      res.status(500);
      res.send(`{"error": ${err}}`);
    }
};

// Get details of a specific Kitten
exports.kitten_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Kitten detail: ' + req.params.id);
};

// Handle Kitten creation on POST
exports.kitten_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Kitten create POST');
};

// Handle Kitten delete on DELETE
exports.kitten_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Kitten delete DELETE ' + req.params.id);
};

// Handle Kitten update on PUT
exports.kitten_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Kitten update PUT ' + req.params.id);
};
