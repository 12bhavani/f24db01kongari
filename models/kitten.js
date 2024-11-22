const mongoose = require('mongoose');

const kittenSchema = new mongoose.Schema({
  name: String,
  age: { 
    type: Number,
    required: [true, 'Age is required.'],
    min: [1, 'Age must be at least 1.'],
    max: [10, 'Age cannot exceed 10.']
  },
  owner_name: String
});

const Kitten = mongoose.model('Kitten', kittenSchema);

module.exports = Kitten;
