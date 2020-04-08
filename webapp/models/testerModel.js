const mongoose = require('mongoose');

const testerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A user name must have at most 40 characters'],
    minlength: [10, 'A user name must have at least 10 characters'],
  },
  firebaseId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: [true, 'A user must have a address'],
  },
  city: {
    type: String,
    required: [true, 'A user must have a city'],
  },
  state: {
    type: String,
    required: [true, 'A user must have a state'],
  },
  zip: {
    type: Number,
    required: [true, 'A user must have a zipcode'],
  },
  usertype: {
    type: String,
    required: [true, 'A user must have a type'],
    enum: {
      values: ['Manager', 'Tester'],
    },
    default: 'Tester',
  },
  technology: {
    type: String,
  },
});

const Tester = mongoose.model('Tester', testerSchema);
module.exports = Tester;
