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
// Handle Kitten create on POST
exports.kitten_create_post = async function(req, res) {
    console.log(req.body);
    let document = new Kitten();
    // Populate the Kitten fields from the request body
    document.name = req.body.name;
    document.age = req.body.age;
    document.owner_name = req.body.owner_name;
    try {
        let result = await document.save();
        res.send(result); // Send back the saved kitten document
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


// Handle Kitten delete on DELETE
exports.kitten_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Kitten delete DELETE ' + req.params.id);
};

// Handle Kitten update on PUT
exports.kitten_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Kitten update PUT ' + req.params.id);
};
