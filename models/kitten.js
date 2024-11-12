const mongoose = require('mongoose');

const kittenSchema = new mongoose.Schema({
  name: String,
  age: Number,
  owner_name: String
});

const Kitten = mongoose.model('Kitten', kittenSchema);  // Create the model and export it

module.exports = Kitten;
