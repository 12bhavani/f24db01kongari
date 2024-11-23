const mongoose = require('mongoose');

const kittenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10
  },
  age: { 
    type: Number,
    required: [true, 'Age is required.'],
    min: [1, 'Age must be at least 1.'],
    max: [10, 'Age cannot exceed 10.']
  },
  owner_name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10
  }
});

const Kitten = mongoose.model('Kitten', kittenSchema);

module.exports = Kitten;
