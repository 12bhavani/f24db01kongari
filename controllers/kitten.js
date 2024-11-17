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
    document.name = req.body.name;
    document.age = req.body.age;
    document.owner_name = req.body.owner_name;
    try {
        let result = await document.save();
        res.send(result); 
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.kitten_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await Kitten.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document!!!! for id ${req.params.id} not found`);
    }
    };

exports.kitten_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Kitten.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };

exports.kitten_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
      let toUpdate = await Kitten.findById(req.params.id);
  
      if (!toUpdate) {
        return res.status(404).send({ error: `Kitten with id ${req.params.id} not found` });
      }
  
      if (req.body.name) toUpdate.name = req.body.name;
      if (req.body.age) toUpdate.age = req.body.age;
      if (req.body.owner_name) toUpdate.owner_name = req.body.owner_name;
  
      if (req.body.checkboxsale) {
        toUpdate.sale = true; 
      } else {
        toUpdate.sale = false; 
      }
  
      let result = await toUpdate.save();
      console.log("Success " + result);
      res.send(result);
  
    } catch (err) {
      console.error(`Error during update: ${err}`);
      res.status(500).send({ error: `Update for id ${req.params.id} failed: ${err.message}` });
    }
  };
