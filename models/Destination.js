const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nextIndex: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Destination', destinationSchema);
