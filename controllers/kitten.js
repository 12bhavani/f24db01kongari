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
exports.kitten_detail = async function(req, res) {
    console.log("Fetching kitten with ID: " + req.params.id); // Debugging
    try {
      const result = await Kitten.findById(req.params.id); // Find the kitten by ID
      if (!result) {
        res.status(404); // Not Found
        res.send({ error: `Kitten with ID ${req.params.id} not found` });
        return;
      }
      res.send(result); // Send the kitten details
    } catch (error) {
      res.status(500); // Internal Server Error
      res.send({ error: `Error retrieving kitten with ID ${req.params.id}` });
    }
  };

// Handle Kitten delete on DELETE
exports.kitten_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Kitten delete DELETE ' + req.params.id);
};

// Handle Costume update form on PUT.
// Handle Kitten update form on PUT.
exports.kitten_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
      // Find the kitten to update by its ID
      let toUpdate = await Kitten.findById(req.params.id);
  
      if (!toUpdate) {
        return res.status(404).send({ error: `Kitten with id ${req.params.id} not found` });
      }
  
      // Update properties if provided in the request body
      if (req.body.name) toUpdate.name = req.body.name;
      if (req.body.age) toUpdate.age = req.body.age;
      if (req.body.owner_name) toUpdate.owner_name = req.body.owner_name;
  
      // Handle other fields if necessary, e.g., checkbox
      if (req.body.checkboxsale) {
        toUpdate.sale = true; // If checked, set sale to true
      } else {
        toUpdate.sale = false; // If unchecked, set sale to false
      }
  
      // Save the updated kitten document to the database
      let result = await toUpdate.save();
      console.log("Success " + result);
      res.send(result);
  
    } catch (err) {
      console.error(`Error during update: ${err}`);
      res.status(500).send({ error: `Update for id ${req.params.id} failed: ${err.message}` });
    }
  };
  